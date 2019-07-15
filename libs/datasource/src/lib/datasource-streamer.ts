import { combineLatest, of, isObservable, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DataSourceLogger } from './datasource-logger';
import { srcEmitted, srcInvalid, srcOutput, srcConnect } from './messages';
import { DataSourceStream } from './types';

export class DataSourceStreamer<T> {
  // streams to listen
  streams: Array<DataSourceStream<T>> = [];

  get length() {
    return this.streams.length;
  }

  constructor(private logger: DataSourceLogger) {}

  add(src: DataSourceStream<T>) {
    this.logger.check(!src.stream, srcInvalid());
    this.streams.push(src);
    return src.name;
  }

  remove(name: string) {
    this.streams = this.streams.filter(s => s.name !== name);
  }

  connect() {
    this.logger.print(
      srcConnect(),
      this.streams.map((src, i) => src.name || i)
    );

    return (this.streams.length
      ? combineLatest(
          this.streams
            .filter(src => src.stream && isObservable(src.stream))
            .sort((a, b) => {
              return (a.weight || 0) < (b.weight || 0) ? -1 : 1;
            })
            .map((src, i) =>
              src.stream.pipe(
                tap(output =>
                  this.logger.print(srcEmitted(src.name || i), output)
                )
              )
            )
        )
      : of([])
    ).pipe(
      tap(v => this.logger.print(srcOutput(), v)),
      map(outputs => outputs.reduce((a, b) => ({ ...a, ...b })))
    );
  }
}
