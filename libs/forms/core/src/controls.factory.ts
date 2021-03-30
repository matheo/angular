import { Provider } from '@angular/core';
import {
  ControlProvider,
  InjectedControl,
  LazyControl,
} from './control-provider.interface';
import { DYN_CONTROLS_TOKEN } from './controls.token';

function isLazy(provider: ControlProvider): provider is LazyControl {
  return provider.hasOwnProperty('useFactory');
}

export function controlsFactory(controls?: ControlProvider[]): Provider[] {
  if (!controls) {
    return [];
  }

  return controls
    .map(
      (provider: ControlProvider): InjectedControl => {
        if (isLazy(provider)) {
          // TODO resolve provider.component
        }
        return {
          dynControl: provider.dynControl,
          component: provider.component ?? ({} as any),
        };
      }
    )
    .map((control) => ({
      provide: DYN_CONTROLS_TOKEN,
      useValue: control,
      multi: true,
    }));
}
