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

  resolve(type: DynControlType): InjectedControl {
    const control = this.controls.find(({ dynControl }) => type === dynControl);

    if (!control) {
      throw new Error(`Error 01: Control '${type}' not provided!`);
    }

    return control;
  }
}
