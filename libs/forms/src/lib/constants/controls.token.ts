import { InjectionToken } from '@angular/core';
import { InjectedControl } from '@matheo/dyn-forms/core';

export const _CONTROLS_ARGS_TOKEN = new InjectionToken<InjectedControl[]>(
  '@matheo/dyn-forms/controls'
);
