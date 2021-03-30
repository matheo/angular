import { InjectionToken } from '@angular/core';
import { InjectedControl } from '@myndpm/dyn-forms/core';

export const _CONTROLS_ARGS_TOKEN = new InjectionToken<InjectedControl[]>(
  '@myndpm/dyn-forms/controls'
);
