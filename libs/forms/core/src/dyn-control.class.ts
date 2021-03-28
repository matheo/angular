import {
  ChangeDetectorRef,
  Directive,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { isObservable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynBaseConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynControlType, DynInstanceType } from './control.type';

@Directive()
export abstract class DynControl<
  TParams extends DynControlParams = DynControlParams,
  TConfig extends DynBaseConfig<TParams> = DynBaseConfig<TParams>,
  TControl extends AbstractControl = FormGroup // friendly and most-common default
> implements OnInit, OnDestroy {
  // central place to define the provided Instance
  static dynInstance: DynInstanceType;
  // central place to define the provided Type
  static dynControl: DynControlType;

  abstract parent: DynControl;

  config!: TConfig;
  params!: TParams;
  control!: TControl;

  protected _ref: ChangeDetectorRef;
  protected _unsubscribe = new Subject<void>();

  constructor(injector: Injector) {
    this._ref = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    if (this.config.dynParams) {
      if (!isObservable(this.config.dynParams)) {
        this.params = this.config.dynParams;
      } else {
        // emulates the async pipe
        this.config.dynParams.pipe(takeUntil(this._unsubscribe)).subscribe({
          next: (params) => {
            this.params = params;
            this._ref.markForCheck();
          },
        });
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  // abstract getConfig(partial: TConfig): TConfig
}
