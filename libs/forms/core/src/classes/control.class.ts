import { Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynControlConfig } from '../interfaces/control-config.interface';
import { DynControlType } from '../interfaces/control.type';

export abstract class DynControl<
  TConfig extends DynControlConfig = DynControlConfig,
  TControl extends AbstractControl = AbstractControl
> {
  static dynControl: DynControlType;
  abstract parent: DynControl;

  config!: TConfig;
  control!: TControl;

  constructor(injector: Injector) {
    // this.cdr = injector.get(ChangeDetectorRef);
  }
}
