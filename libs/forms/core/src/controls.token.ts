import { InjectionToken } from '@angular/core';
import { DynControl } from './control.class';

export const DYN_CONTROLS_TOKEN = new InjectionToken<DynControl[]>(
  '@matheo/dyn-forms/dyn-controls'
);
