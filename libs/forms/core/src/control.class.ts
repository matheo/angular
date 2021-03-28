import { Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlType } from './control.type';

export abstract class DynControl<
  TConfig extends DynControlConfig = DynControlConfig,
  TControl extends AbstractControl = AbstractControl
> {
  // central definition of the provided Type
  static dynControl: DynControlType;

  abstract parent: DynControl;

  config!: TConfig;
  control!: TControl;

  constructor(injector: Injector) {
    // this.cdr = injector.get(ChangeDetectorRef);
  }

  // abstract getConfig(partial: TConfig): TConfig
}
