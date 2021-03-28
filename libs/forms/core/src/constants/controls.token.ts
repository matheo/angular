import { InjectionToken } from '@angular/core';
import { DynControl } from '../classes/control.class';

export const DYN_CONTROLS_TOKEN = new InjectionToken<DynControl<any>[]>(
  '@matheo/dyn-forms/dyn-controls'
);
