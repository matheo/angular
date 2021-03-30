import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';
import { DynControl } from './dyn-control.class';

@Injectable({
  providedIn: 'root',
})
export class DynFormService {
  constructor() {}

  register<FormGroup>(
    type: DynInstanceType.Container | DynInstanceType.Group,
    config: DynBaseConfig,
    parent: DynControl,
    recursively?: boolean
  ): FormGroup;
  register<FormArray>(
    type: DynInstanceType.Array,
    config: DynBaseConfig,
    parent: DynControl,
    recursively?: boolean
  ): FormArray;
  register<FormControl>(
    type: DynInstanceType.Control,
    config: DynBaseConfig,
    parent: DynControl,
    recursively?: boolean
  ): FormControl;
  register<T extends AbstractControl>(
    type: DynInstanceType,
    config: DynBaseConfig,
    parent: DynControl,
    recursively = false
  ): T {
    // fail-safe validation
    if (type !== config.dynInstance) {
      throw new Error(
        `Error 03: Cannot register ${type} for a config with ${config.dynInstance}`
      );
    }

    // return any existing control with this name
    let control = config.name ? parent.control.get(config.name) : null;
    if (control) {
      return control as T;
    }

    control = this.build(type as any, config, recursively);
    if (!control) {
      throw new Error(`Error 04: Could not build a control for ${type}`);
    }

    if (config.name) {
      this.append(parent, config.name, control);
    }

    return control as T;
  }

  build<FormGroup>(
    type: DynInstanceType.Container | DynInstanceType.Group,
    config: DynBaseConfig,
    recursively: boolean
  ): FormGroup;
  build<FormArray>(
    type: DynInstanceType.Array,
    config: DynBaseConfig,
    recursively: boolean
  ): FormArray;
  build<FormControl>(
    type: DynInstanceType.Control,
    config: DynBaseConfig,
    recursively: boolean
  ): FormControl;
  build<T extends AbstractControl>(
    type: DynInstanceType,
    config: DynBaseConfig,
    recursively = false
  ): T {
    switch (type) {
      case DynInstanceType.Container:
      case DynInstanceType.Group:
        const control = new FormGroup({}, config.dynOptions);
        if (recursively) {
          config.controls?.forEach((item) => {
            control.addControl(
              item.name,
              this.build(item.dynInstance as any, item, recursively)
            );
          });
        }
        return (control as unknown) as T;

      case DynInstanceType.Array:
        return (new FormArray(
          [this.build(DynInstanceType.Group, config, true)],
          config.dynOptions
        ) as unknown) as T;

      case DynInstanceType.Control:
        return (new FormControl(null, config.dynOptions) as unknown) as T;
    }
  }

  append(parent: DynControl, name: string, control: AbstractControl) {
    // only FormGroup can be extended
    if (parent.control.addControl) {
      parent.control.addControl(name, control);
    } else {
      console.warn(`Didn't add '${name}' to ${parent.config.name}`);
    }
  }
}
