import { DataSource } from '@angular/cdk/table';
import { Injectable, OnDestroy } from '@angular/core';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  isObservable,
  merge,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  skipWhile,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { DataSourceConfig, defaultConfig } from './config';
import { MatDataSourceIntl } from './datasource-intl';
import { DataSourceLogger } from './datasource-logger';
import { DataSourceStreamer } from './datasource-streamer';
import {
  addWhenRunning,
  disconnecting,
  emptyMsg,
  isAutoStarting,
  notAutoStarting,
  queryResponse,
  queryTimeout,
  removingStream,
  resolvedArgs,
  responseError,
  responseSuccess,
  responseTotal,
  rmWhenRunning,
  srcAdding,
  srcEmpty,
} from './messages';
import { DataSourceOpts, DataSourceStream } from './types';

@Injectable()
export abstract class MatDataSource<REQ = any, RAW = any, RES = any>
  extends DataSource<RES>
  implements OnDestroy {
  /**
   * State to control outside behavior like css classes and components.
   * Updated by pre/postQuery to show/hide the loading overlay and empty message.
   */
  private _reloading = true;

  get isLoading() {
    return this._loading;
  }
  private _loading = true;

  get isLoaded() {
    return this._loaded;
  }
  private _loaded = false;

  get isEmpty() {
    return this._empty;
  }
  private _empty = true;

  set skipSave(val: any) {
    this._skip = !!val;
  }
  private _skip = false;

  /**
   * Number used to calculate the pagination length.
   * Updated after the rawResult method according to the response data.
   */
  get total() {
    return this._total;
  }
  private _total = 0;

  get data() {
    return this._data ? this._data : [];
  }
  private _data: Array<RES> = [];

  /**
   * Number used to calculate the loading progress.
   * Updated while loading the query and triggering change$.
   */
  get progress() {
    return this._progress;
  }
  protected _progress = 0;

  /**
   * Output message getter.
   */
  get outputMsg() {
    return this._outputMsg;
  }
  protected _outputMsg: string;

  /**
   * Accessors
   */
  get args(): REQ {
    return this.arguments || ({} as REQ);
  }

  get progressMode() {
    return this._config.progressMode;
  }

  get change$() {
    return this._change$.asObservable();
  }

  get data$() {
    return this._data$.asObservable();
  }

  get hasErrors() {
    return this._logger.hasErrors(true);
  }

  get getErrors() {
    return this._logger.getErrors();
  }

  /**
   * Setters
   */

  // config settings
  get config() {
    return this._config;
  }
  set config(config: Partial<DataSourceConfig>) {
    this._config = {
      ...this._config,
      ...config,
    };
    this._logger.config = this._config;
  }
  protected _config = defaultConfig;

  /**
   * Control members for the datasource processing.
   */
  protected defaults: Partial<REQ> = {};
  protected overrides: Partial<REQ> = {};
  protected arguments: REQ & DataSourceOpts;

  /**
   * Error control vars.
   */
  protected readonly _logger = new DataSourceLogger(
    this.constructor.name,
    this.intl
  );

  /**
   * Stream only used to trigger a refresh on the data.
   * Can receive some Criteria overrides for a temporary update.
   * It has to be used outside the datasource to prevent infinite loops.
   */
  protected readonly _trigger$ = new BehaviorSubject<
    Partial<REQ> | DataSourceOpts
  >({});

  /** Executions counter */
  private _triggered = 0;

  /** Registered streams */
  private readonly _streams = new DataSourceStreamer<REQ | DataSourceOpts>(
    this._logger
  );

  /** Output Emitter to refresh the UI. */
  protected readonly _change$ = new BehaviorSubject<any>({});

  /** Output Emitter of the latest Data. */
  protected readonly _data$ = new Subject<Array<RES>>();

  /** Disconnect internal observable. */
  protected readonly _disconnect$ = new Subject<void>();

  /**
   * DataSource.
   */
  constructor(protected intl?: MatDataSourceIntl<REQ>) {
    super();

    // update i18n if present
    if (this.intl) {
      this.config = this.intl;
    }

    // initial config sync
    this._logger.config = this._config;

    // listen the internal trigger
    this.addStream(this._trigger$);
  }

  ngOnDestroy() {
    this._logger.print(disconnecting(), '');
    this.disconnect();
  }

  /**
   * Streams
   */

  addArguments(args: Partial<REQ>) {
    this.defaults = { ...this.defaults, ...args };
  }

  addStream(
    stream: Observable<Partial<REQ | DataSourceOpts>> | DataSourceStream<REQ>
  ): string {
    const src: DataSourceStream<REQ | DataSourceOpts> = isObservable(stream)
      ? {
          name: this._streams.length.toString(),
          stream,
        }
      : stream;

    this._logger.check(this._triggered, addWhenRunning(src.name || src.stream));
    this._logger.debug(srcAdding(src.name), srcEmpty(src.name), stream);

    return this._streams.add(src);
  }

  remStream(name: string) {
    this._logger.check(this._triggered, rmWhenRunning(name));
    this._logger.print(removingStream(), name);
    this._streams.remove(name);
  }

  /**
   * Triggers
   */

  refresh(overrides: Partial<REQ> = {}) {
    this.overrides = overrides;
    this._trigger$.next(overrides);
  }

  reload() {
    this._reloading = true;
    this._trigger$.next({ forceReload: new Date().getTime() });
  }

  restart() {
    this._triggered = 0;
  }

  /**
   * Data processing that can be completely customized.
   */
  reqArguments(args: REQ): REQ {
    return args;
  }

  abstract rawDefault(): RAW;

  abstract rawFetch(args: REQ): Observable<RAW>;

  abstract rawTotal(result: RAW): Observable<number>;

  rawFilter(result: RAW) {
    return true;
  }

  abstract rawResult(result: RAW): Array<RES>;

  /**
   * Data Fetching Methods
   */
  private _blockStart(): boolean {
    // check if it's not configured to start after the first trigger
    const block = this._triggered === 1 && !this._config.autoStart;

    if (this._triggered === 1) {
      this._logger.debug(
        isAutoStarting(),
        notAutoStarting(this._streams.length),
        !block
      );
    }

    if (block) {
      this._loading = false;
    }

    return block;
  }

  private _getArgs(output: Partial<REQ | DataSourceOpts>): REQ {
    // merge all the stream outputs
    this.arguments = {
      ...this.defaults,
      ...output,
      ...this.overrides,
    } as any;

    delete this.arguments.forceReload;

    return this.arguments;
  }

  private _isEqual(): (prev: REQ, curr: REQ) => boolean {
    return (prev, curr) => {
      const isDistinct = !this._reloading && isEqual(prev, curr);

      this._logger.print(resolvedArgs(isDistinct), curr);

      return isDistinct;
    };
  }

  private _preQuery(): void {
    // state update
    this._loading = true;
    this._reloading = false;
    this._outputMsg = '';
    this._logger.clearErrors();
    this._change$.next({});
    this.overrides = {};
  }

  private _execQuery(args: REQ): Observable<RAW> {
    const query = this.rawFetch(args);

    return merge(
      query,
      // timers check
      timer(this.config.waitMs, this.config.intervalMs).pipe(
        takeUntil(query),
        take(3) // by default: 5s, 15s, 25s
      )
    ).pipe(
      // delay check
      tap((val) => {
        if (typeof val !== 'number') {
          this._logger.print(queryResponse(), val);
        } else {
          this._logger.print(queryTimeout(), val);
          try {
            this._outputMsg = this._logger.getTimeoutError(val);
          } catch (e) {
            this._logger.addError('timeout', e.message);
            this._loading = false;
          }
          this._change$.next({});
        }
      }),
      // discard timer result
      filter<RAW>((result) => typeof result !== 'number'),
      catchError((err) => {
        // isolate query error
        this._logger.handleError('query', err);
        return of(this.rawDefault());
      })
    );
  }

  private _updateTotal(res: RAW): void {
    if (!this.hasErrors) {
      // microtask as workaround for change detection
      this.rawTotal(res)
        .pipe(
          take(1),
          tap((total) => this._logger.print(responseTotal(), total))
        )
        .subscribe((total) => {
          this._total = total;
          this._change$.next({});
        });
    }
  }

  private _processException(err: any) {
    console.error(`${this.constructor.name} Exception`, err);
    return of(false);
  }

  private _postQuery(res: RAW): Array<RES> {
    const hasErrors = this.hasErrors;
    const data = !hasErrors ? this.rawResult(res) : [];

    this._logger.debug(
      responseSuccess(data),
      responseError(this.getErrors),
      !hasErrors
    );

    this._empty = !data || !data.length;

    if (!hasErrors && this._empty) {
      this._outputMsg = this._emptyMessage();
    }

    if (!this._skip) {
      this._data = data;
      this._data$.next(data);
    }

    this._loaded = !hasErrors;
    this._loading = false;
    this._skip = false;
    this._change$.next({});

    return data;
  }

  private _emptyMessage() {
    if (this.intl?.emptyMsg) {
      if (typeof this.intl.emptyMsg === 'function') {
        return this.intl.emptyMsg(this.args);
      } else {
        return this.intl.emptyMsg;
      }
    }
    if (this._config.emptyMsg) {
      if (typeof this._config.emptyMsg === 'function') {
        return this._config.emptyMsg(this.args);
      } else {
        return this._config.emptyMsg;
      }
    }
    return emptyMsg();
  }

  /**
   * Data API
   */

  connect() {
    return this._streams.connect().pipe(
      takeUntil(this._disconnect$),
      throttleTime(10),
      tap(() => this._triggered++),
      skipWhile(() => this._blockStart()),
      map((args) => this._getArgs(args)),
      map((req) => this.reqArguments(req)),
      distinctUntilChanged(this._isEqual()),
      tap(() => this._preQuery()),
      switchMap((req) => this._execQuery(req)),
      takeUntil(this._disconnect$),
      filter((raw) => this.rawFilter(raw)),
      tap((raw) => this._updateTotal(raw)),
      catchError((err) => this._processException(err)),
      map((raw) => this._postQuery(raw))
    ) as Observable<RES[]>;
  }

  disconnect() {
    this._trigger$.complete();
    this._change$.complete();
    this._disconnect$.next();
    this._disconnect$.complete();
  }
}
