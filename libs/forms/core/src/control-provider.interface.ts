import { Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynControlConfig } from './control-config.interface';
import { DynControlType } from './control.type';
import { DynControl } from './dyn-control.class';

export interface LazyControl {
  dynControl: DynControlType;
  useFactory: Function;
  component?: Type<DynControl<DynControlConfig, AbstractControl>>;
}

export interface InjectedControl {
  dynControl: DynControlType;
  component: Type<DynControl<DynControlConfig, AbstractControl>>;
}

export type ControlProvider = LazyControl | InjectedControl;
