import { Provider } from '@angular/core';
import { ControlProvider, LazyControl } from './control-provider.interface';
import { DYN_CONTROLS_TOKEN } from './controls.token';

export function isLazyControl(
  provider: ControlProvider
): provider is LazyControl {
  return provider.hasOwnProperty('useFactory');
}

export function controlsFactory(controls?: ControlProvider[]): Provider[] {
  if (!controls) {
    return [];
  }

  return controls.map((control) => ({
    provide: DYN_CONTROLS_TOKEN,
    useValue: control,
    multi: true,
  }));
}
