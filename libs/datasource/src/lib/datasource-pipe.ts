import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
  Type,
  ɵisObservable,
  ɵstringify as stringify,
} from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { ReactiveDataSource } from './datasource-reactive';

export function invalidPipeArgumentError(type: Type<any>, value: Object) {
  return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}

interface SubscriptionStrategy {
  createSubscription(
    async: Observable<any>,
    updateLatestValue: any
  ): SubscriptionLike;
  dispose(subscription: SubscriptionLike): void;
  onDestroy(subscription: SubscriptionLike): void;
}

class ObservableStrategy implements SubscriptionStrategy {
  createSubscription(
    async: Observable<any>,
    updateLatestValue: any
  ): SubscriptionLike {
    return async.subscribe({
      next: updateLatestValue,
      error: (e: any) => {
        throw e;
      },
    });
  }

  dispose(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }

  onDestroy(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }
}

const _observableStrategy = new ObservableStrategy();

/**
 * Unwraps a value from an asynchronous primitive.
 *
 * The `dataSource` pipe subscribes to a `DataSource` and returns the latest value it has
 * emitted. When a new value is emitted, the `dataSource` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `dataSource` pipe disconnects automatically to avoid
 * potential memory leaks.
 */
@Pipe({ name: 'dataSource', pure: false })
export class DataSourcePipe implements OnDestroy, PipeTransform {
  private _latestValue: any = null;

  private _subscription: SubscriptionLike | null = null;
  private _obj: ReactiveDataSource<any, any, any> | null = null;
  private _strategy: SubscriptionStrategy = null!;

  constructor(private _ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }
  }

  transform<T>(obj: null): null;
  transform<T>(obj: undefined): undefined;
  transform(obj: ReactiveDataSource<any, any, any> | null | undefined): any {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }
      return this._latestValue;
    }

    if (obj !== this._obj) {
      this._dispose();
      return this.transform(obj as any);
    }

    return this._latestValue;
  }

  private _subscribe(obj: ReactiveDataSource<any, any, any>): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    const stream = obj.connect();
    this._subscription = this._strategy.createSubscription(
      stream,
      (value: Object) => this._updateLatestValue(obj, value)
    );
  }

  private _selectStrategy(obj: ReactiveDataSource<any, any, any>): any {
    if (ɵisObservable(obj.change$)) {
      return _observableStrategy;
    }

    throw invalidPipeArgumentError(DataSourcePipe, obj);
  }

  private _dispose(): void {
    this._strategy.dispose(this._subscription!);
    this._obj.disconnect();
    this._latestValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object): void {
    if (async === this._obj) {
      this._latestValue = value;
      this._ref.markForCheck();
    }
  }
}
