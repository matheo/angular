import { isEmpty, merge as deepMerge } from 'lodash';
import { combineLatest, merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataSourceLogger } from './datasource-logger';
import { srcEmitted, srcInvalid } from './messages';
import { DataSourceStream, REQUIRED_INIT } from './types';

export class DataSourceStreamer<T> {
  // streams to listen
  streams: Array<DataSourceStream<T>> = [];

  // micro optimization
  length = {
    required: 0,
    optional: 0
  };

  get required() {
    return this.streams.filter(s => s.required).map(s => s.stream);
  }

  get optional() {
    return this.streams.filter(s => !s.required).map(s => s.stream);
  }

  constructor(private logger: DataSourceLogger) {}

  add(src: DataSourceStream<T>) {
    this.logger.check(!src.stream, srcInvalid());
    this.streams.push(src);
    this.update();
  }

  remove(name: string) {
    this.streams = this.streams.filter(s => s.name !== name);
    this.update();
  }

  private update() {
    this.length = {
      required: this.required.length,
      optional: this.optional.length - 1 // remove trigger$
    };
  }

  args(defaults: Partial<T>, overrides: Partial<T>): T {
    // merge all the argument sources
    const args = [
      defaults,
      ...this.streams
        .sort((a, b) => {
          return (a.weight || 0) < (b.weight || 0) ? -1 : 1;
        })
        .map(s => s.getter()),
      overrides
    ].filter(v => !isEmpty(v));

    // all the defaults and getters must complete a T object
    return (args.length > 1
      ? args.reduce((a: any, b: any) => deepMerge({}, a, b))
      : args[0] || {}) as T;
  }

  connect() {
    return combineLatest(
      this.streams.some(s => s.required)
        ? combineLatest(...this.required)
        : of(REQUIRED_INIT),
      merge(...this.optional)
    ).pipe(tap(v => this.logger.print(srcEmitted(), v)));
  }
}
