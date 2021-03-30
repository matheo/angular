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
import { DynFormService } from './form.service';

@Directive()
export abstract class DynControl<
  TParams extends DynControlParams = DynControlParams,
  TConfig extends DynBaseConfig<TParams> = DynBaseConfig<TParams>,
  TControl extends AbstractControl = FormGroup // friendly and most-common default
> implements OnInit, OnDestroy {
  // central place to define the provided Type
  static dynControl: DynControlType = '';
  // central place to define the provided Instance
  static dynInstance: DynInstanceType = DynInstanceType.Group;

  // abstract static createConfig(partial?: DynPartialControlConfig<TParams>): TConfig;

  abstract parent: DynControl;

  config!: TConfig; // passed down in the hierarchy
  control!: TControl; // built from the config by the abstract classes
  params!: TParams; // values available for the concrete Component instance

  protected _form: DynFormService;
  protected _ref: ChangeDetectorRef;
  protected _unsubscribe = new Subject<void>();

  constructor(injector: Injector) {
    this._form = injector.get(DynFormService);
    this._ref = injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    // assign incoming parameters
    if (this.config.params) {
      if (!isObservable(this.config.params)) {
        this.params = this.completeParams(this.config.params || {});
      } else {
        // emulates the async pipe
        this.config.params.pipe(takeUntil(this._unsubscribe)).subscribe({
          next: (params) => {
            this.params = this.completeParams(params);
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

  abstract completeParams(params: Partial<TParams>): TParams;
}
