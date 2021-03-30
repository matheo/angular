import { InjectionToken } from '@angular/core';
import { ControlProvider } from './control-provider.interface';

export const DYN_CONTROLS_TOKEN = new InjectionToken<ControlProvider[]>(
  '@matheo/dyn-forms/dyn-controls'
);
