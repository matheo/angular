import { Directive, Injector } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlType, DynInstanceType } from './control.type';

@Directive()
export abstract class DynControl<
  TConfig extends DynControlConfig = DynControlConfig,
  TControl extends AbstractControl = FormGroup // friendly default
> {
  // central place to define the provided Instance
  static dynInstance: DynInstanceType;
  // central place to define the provided Type
  static dynControl: DynControlType;

  abstract parent: DynControl<DynControlConfig, FormGroup>;

  config!: TConfig;
  control!: TControl;

  constructor(injector: Injector) {
    // this.cdr = injector.get(ChangeDetectorRef);
  }

  // abstract getConfig(partial: TConfig): TConfig
}
