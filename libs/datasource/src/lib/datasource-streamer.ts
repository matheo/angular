import { combineLatest, isObservable, merge, of } from 'rxjs';
import { first, map, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { DataSourceLogger } from './datasource-logger';
import { srcConnect, srcEmitted, srcInvalid, srcOutput } from './messages';
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
    if (src.stream && isObservable(src.stream)) {
      this.streams.push(src);
    }
    return src.name;
  }

  remove(name: string) {
    this.streams = this.streams.filter((s) => s.name !== name);
  }

  connect() {
    this.logger.print(
      srcConnect(),
      this.streams.map((src, i) => src.name || i)
    );

    const required = this.streams
      .filter((src) => !src.optional)
      .sort((a, b) => ((a.weight || 0) < (b.weight || 0) ? -1 : 1))
      .map(this.logEmittedValue());

    const optional = this.streams
      .filter((src) => src.optional)
      .map(this.logEmittedValue());

    return combineLatest([
      required.length
        ? combineLatest(required).pipe(
            // waits the first emission of the required ones
            map((args) => args.reduce(this.reducePartials, {} as Partial<T>)),
            first(),
            // and from there it accumulates the emissions
            switchMap((args) =>
              merge(...required).pipe(
                startWith(args),
                scan(this.reducePartials, {} as Partial<T>)
              )
            )
          )
        : of({} as Partial<T>),
      optional.length
        ? merge(...optional).pipe(
            startWith({}),
            scan(this.reducePartials, {} as Partial<T>)
          )
        : of({} as Partial<T>),
    ]).pipe(
      map((args) => args.reduce(this.reducePartials, {} as Partial<T>)),
      tap((v) => this.logger.print(srcOutput(), v))
    );
  }

  private logEmittedValue() {
    return (src: DataSourceStream<T>, i: number) =>
      src.stream.pipe(
        tap((output) => this.logger.print(srcEmitted(src.name || i), output))
      );
  }

  private reducePartials(a: Partial<T>, b: Partial<T>) {
    return { ...a, ...b };
  }
}
