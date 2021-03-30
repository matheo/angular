import { Inject, Injectable } from '@angular/core';
import {
  ControlProvider,
  DynControlType,
  DYN_CONTROLS_TOKEN,
  InjectedControl,
  isLazyControl,
} from '@myndpm/dyn-forms/core';

@Injectable()
export class ControlResolverService {
  constructor(
    @Inject(DYN_CONTROLS_TOKEN) private controls: ControlProvider[]
  ) {}

  resolve(dynControl: DynControlType): InjectedControl {
    const resolved = this.controls.find(
      ({ control }) => dynControl === control
    );

    if (!resolved) {
      throw new Error(`Error 01: Control '${dynControl}' not provided!`);
    }

    if (isLazyControl(resolved)) {
      // TODO resolve provider.component
    }

    return {
      control: resolved.control,
      component: resolved.component ?? ({} as any),
    };
  }
}
