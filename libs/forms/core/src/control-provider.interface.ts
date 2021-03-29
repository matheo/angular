import { Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynControlParams } from './control-params.interface';
import { DynControlType, DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

export type AbstractDynControl = DynControl<
  DynControlParams,
  DynBaseConfig,
  AbstractControl
>;

export interface LazyControl {
  dynInstance: DynInstanceType;
  dynControl: DynControlType;
  useFactory: Function;
  component?: Type<AbstractDynControl>;
}

export interface InjectedControl {
  dynInstance: DynInstanceType;
  dynControl: DynControlType;
  component: Type<AbstractDynControl>;
}

export type ControlProvider = LazyControl | InjectedControl;
