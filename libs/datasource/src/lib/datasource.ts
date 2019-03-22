import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, merge, Observable, of, Subject, timer } from 'rxjs';
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
import {
  DataSourceOpts,
  DataSourceStream,
  TRIGGER_INIT,
  TRIGGER_REFRESH,
  TRIGGER_RELOAD
} from './types';

export abstract class MatDataSource<REQ, RAW, RES> extends DataSource<RES> {
  /**
   * State to control outside behavior like css classes and components.
   * Updated by pre/postQuery to show/hide the loading overlay and empty message.
   */
  get isLoading() {
    return this._loading;
  }
  protected _loading = true;

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
  get args() {
    return this.arguments || {};
  }

  get progressMode() {
    return this._config.progressMode;
  }

  get change$() {
    return this._change$;
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
  protected overrides: any = {};
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
  protected readonly _trigger$ = new BehaviorSubject<string>(TRIGGER_INIT);

  /** Executions counter */
  private _triggered = 0;

  /** Output Emitter to refresh the UI. */
  private readonly _change$ = new BehaviorSubject<any>({});

  /** Registered streams */
  private readonly _streams = new DataSourceStreamer<REQ>(this._logger);

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
    this.addOptional({
      stream: this._trigger$,
      getter: () => ({})
    });
  }

  /**
   * Streams
   */

  addArguments(args: Partial<REQ>) {
    this.defaults = { ...this.defaults, ...args };
  }

  addRequired(src: DataSourceStream<REQ>) {
    this._logger.check(this._triggered, addWhenRunning(src.name || src.stream));
    this._logger.debug(
      srcAdding(src.name, true),
      srcEmpty(src.name),
      src.stream
    );

    this._streams.add({
      ...src,
      required: true
    });
  }

  addOptional(src: DataSourceStream<REQ>) {
    this._logger.check(this._triggered, addWhenRunning(src.name || src.stream));
    this._logger.debug(
      srcAdding(src.name, false),
      srcEmpty(src.name),
      src.stream
    );

    this._streams.add({
      ...src,
      required: false
    });
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
    this._trigger$.next(TRIGGER_REFRESH);
  }

  reload() {
    if (this._loaded) {
      this.overrides = { forceReload: true };
    }
    this._trigger$.next(TRIGGER_RELOAD);
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
  private _blockStart(streamed: Array<any>): boolean {
    // check if it's not configured to start after the initial stream
    const block =
      !this._config.autoStart &&
      (this._streams.length.optional > 1 && streamed[1] === TRIGGER_INIT);

    if (this._triggered === 1) {
      this._logger.debug(
        isAutoStarting(),
        notAutoStarting(this._streams.length),
        !block
      );
    }

    return block;
  }

  private _getArgs(): Observable<REQ> {
    // merge all the getters outputs
    this.arguments = this._streams.args(this.defaults, this.overrides);
    this.overrides = {};

    this._logger.print(resolvedArgs(), this.arguments);
    // TODO consider any edge case with forceReload
    delete this.arguments.forceReload;

    return of(this.arguments);
  }

  private _preQuery(): void {
    // state update
    this._loading = true;
    this._outputMsg = '';
    this._logger.clearErrors();
    this._change$.next({});
  }

  private _execQuery(args: REQ): Observable<RAW> {
    const query = this.rawFetch(args);

    return merge(
      query,
      // timers check
      timer(5000, 8000).pipe(
        takeUntil(query),
        take(3) // 5s, 13s, 21s
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
    const result = !hasErrors ? this.rawResult(res) : [];

    this._logger.debug(
      responseSuccess(result.length),
      responseError(),
      !hasErrors
    );

    this._empty = !result || !result.length;

    if (!hasErrors && this._empty) {
      this._outputMsg = this._config.emptyMsg();
    }

    this._loaded = !hasErrors;
    this._loading = false;
    this._change$.next({});

    return result;
  }

  private _processException(err) {
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
      skipWhile(val => this._blockStart(val)),
      switchMap(() => this._getArgs()),
      map(req => this.reqArguments(req)),
      distinctUntilChanged(),
      tap(() => this._preQuery()),
      switchMap(req => this._execQuery(req)),
      tap(raw => this._updateTotal(raw)),
      map(raw => this._postQuery(raw)),
      catchError(err => this._processException(err)),
      filter<RES[]>(res => typeof res !== 'boolean')
    ) as Observable<RES[]>;
  }

  disconnect() {
    this._change$.complete();
    this._trigger$.complete();
    this._disconnect$.next();
    this._disconnect$.complete();
  }
}
