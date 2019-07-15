import { DataSource } from '@angular/cdk/table';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  merge,
  Observable,
  of,
  Subject,
  timer,
  isObservable
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
  tap
} from 'rxjs/operators';
import { DataSourceConfig, defaultConfig } from './config';
import { DataSourceLogger } from './datasource-logger';
import { DataSourceStreamer } from './datasource-streamer';
import {
  addWhenRunning,
  isAutoStarting,
  notAutoStarting,
  queryResponse,
  queryTimeout,
  resolvedArgs,
  responseTotal,
  responseError,
  responseSuccess,
  rmWhenRunning,
  removingStream,
  resException,
  srcAdding,
  srcEmpty
} from './messages';
import { DataSourceOpts, DataSourceStream } from './types';

export abstract class MatDataSource<REQ, RAW, RES> extends DataSource<RES> {
  /**
   * State to control outside behavior like css classes and components.
   * Updated by pre/postQuery to show/hide the loading overlay and empty message.
   */
  get isLoading() {
    return this._loading;
  }
  protected _loading = true;
  private _reloading = true;

  get isLoaded() {
    return this._loaded;
  }
  protected _loaded = false;

  get isEmpty() {
    return this._empty;
  }
  protected _empty = true;

  /**
   * Number used to calculate the pagination length.
   * Updated after the rawResult method according to the response data.
   */
  get total() {
    return this._total;
  }
  protected _total = 0;

  get data() {
    return this._data;
  }
  protected _data: Array<RES> = [];

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
      ...config
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
  protected readonly _logger = new DataSourceLogger(this.constructor.name);

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

  /** Output Emitter to refresh the UI. */
  private readonly _change$ = new BehaviorSubject<any>({});

  /** Registered streams */
  private readonly _streams = new DataSourceStreamer<REQ | DataSourceOpts>(
    this._logger
  );

  /** Disconnect internal observable. */
  private readonly _disconnect$ = new Subject<void>();

  /**
   * DataSource.
   */
  constructor() {
    super();

    // initial config sync
    this._logger.config = this._config;

    // listen the internal trigger
    this.addStream(this._trigger$);
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
          stream
        }
      : stream;

    this._logger.check(this._triggered, addWhenRunning(src.name || src.stream));
    this._logger.debug(srcAdding(name), srcEmpty(name), stream);

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

  /**
   * Data processing that can be completely customized.
   */
  reqArguments(args: REQ): REQ {
    return args;
  }

  abstract rawDefault(): RAW;

  abstract rawFetch(args: REQ): Observable<RAW>;

  abstract rawTotal(result: RAW): Observable<number>;

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

  private _getArgs(outputs: Array<Partial<REQ>>): Observable<REQ> {
    // merge all the stream outputs
    this.arguments = {
      ...this.defaults,
      ...outputs,
      ...this.overrides
    } as any;
    this.overrides = {};

    this._logger.print(resolvedArgs(), this.arguments);
    // TODO consider any edge case with forceReload
    delete this.arguments.forceReload;

    return of(this.arguments);
  }

  private _isEqual(): (prev: REQ, curr: REQ) => boolean {
    return (prev, curr) => !this._reloading && isEqual(prev, curr);
  }

  private _preQuery(): void {
    // state update
    this._loading = true;
    this._reloading = false;
    this._outputMsg = '';
    this._logger.clearErrors();
    this._change$.next({});
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
      take(3),
      // delay check
      tap(val => {
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
      filter<RAW>(result => typeof result !== 'number'),
      catchError(err => {
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
          tap(total => this._logger.print(responseTotal(), total))
        )
        .subscribe(total => (this._total = total));
    }
  }

  private _postQuery(res: RAW): Array<RES> {
    const hasErrors = this.hasErrors;
    this._data = !hasErrors ? this.rawResult(res) : [];

    this._logger.debug(
      responseSuccess(this._data),
      responseError(this.getErrors),
      !hasErrors
    );

    this._empty = !this._data || !this._data.length;

    if (!hasErrors && this._empty) {
      this._outputMsg = this._config.emptyMsg();
    }

    this._loaded = !hasErrors;
    this._loading = false;
    this._change$.next({});

    return this._data;
  }

  private _processException(err: any) {
    this._logger.print(resException(), err);
    return of(false);
  }

  /**
   * Data API
   */

  connect() {
    return this._streams.connect().pipe(
      takeUntil(this._disconnect$),
      tap(() => this._triggered++),
      skipWhile(() => this._blockStart()),
      switchMap(args => this._getArgs(args)),
      map(req => this.reqArguments(req)),
      distinctUntilChanged(this._isEqual()),
      tap(() => this._preQuery()),
      switchMap(req => this._execQuery(req)),
      tap(raw => this._updateTotal(raw)),
      map(raw => this._postQuery(raw)),
      catchError(err => this._processException(err)),
      filter<RES[]>(res => typeof res !== 'boolean')
    ) as Observable<RES[]>;
  }

  disconnect() {
    this._trigger$.complete();
    this._change$.complete();
    this._disconnect$.next();
    this._disconnect$.complete();
  }
}
