import { Inject, Injectable } from '@angular/core';
import {
  DynControlType,
  DYN_CONTROLS_TOKEN,
  InjectedControl,
} from '@matheo/dyn-forms/core';

@Injectable()
export class ControlResolverService {
  constructor(
    @Inject(DYN_CONTROLS_TOKEN) private controls: InjectedControl[]
  ) {}

  resolve(dynControl: DynControlType): InjectedControl {
    const resolved = this.controls.find(
      ({ control }) => dynControl === control
    );

    if (!resolved) {
      throw new Error(`Error 01: Control '${dynControl}' not provided!`);
    }

    return resolved;
  }
}
