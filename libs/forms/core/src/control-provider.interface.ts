import { Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynControlType } from './control.types';
import { DynControl } from './dyn-control.class';

export type AbstractDynControl = DynControl<
  DynControlParams,
  DynBaseConfig,
  AbstractControl
>;

export interface LazyControl {
  control: DynControlType;
  useFactory: Function;
  // resolved in control-resolver.service
  component?: Type<AbstractDynControl>;
}

export interface InjectedControl {
  control: DynControlType;
  component: Type<AbstractDynControl>;
}

export type ControlProvider = LazyControl | InjectedControl;
