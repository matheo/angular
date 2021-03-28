import { Type } from '@angular/core';
import { DynControl } from './control.class';
import { DynControlType } from './control.type';

export interface LazyControl {
  dynControl: DynControlType;
  useFactory: Function;
  component?: Type<DynControl>;
}

export interface InjectedControl {
  dynControl: DynControlType;
  component: Type<DynControl>;
}

export type ControlProvider = LazyControl | InjectedControl;
