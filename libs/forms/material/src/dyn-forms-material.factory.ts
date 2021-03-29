import {
  DynControlConfig,
  DynControlParams,
  DynControlType,
} from '@matheo/dyn-forms/core';
import {
  DynCardComponent,
  DynCardParams,
  DynInputComponent,
  DynInputParams,
} from './components';
import { DynRadioComponent } from './components/radio/radio.component';
import { DynRadioParams } from './components/radio/radio.component.params';
import { DynSelectComponent } from './components/select/select.component';
import { DynSelectParams } from './components/select/select.component.params';

export type PartialConfig<T extends DynControlParams> = Partial<
  DynControlConfig<T>
>;

// type overloads
export function createConfig(
  type: typeof DynCardComponent.dynControl,
  partial: PartialConfig<DynCardParams>
): DynControlConfig;
export function createConfig(
  type: typeof DynInputComponent.dynControl,
  partial: PartialConfig<DynInputParams>
): DynControlConfig;
export function createConfig(
  type: typeof DynRadioComponent.dynControl,
  partial: PartialConfig<DynRadioParams>
): DynControlConfig;
export function createConfig(
  type: typeof DynSelectComponent.dynControl,
  partial: PartialConfig<DynSelectParams>
): DynControlConfig;

// factory
export function createConfig(
  type: DynControlType,
  partial: PartialConfig<DynControlParams>
): DynControlConfig {
  switch (type) {
    // containers
    case DynCardComponent.dynControl:
      return DynCardComponent.createConfig(partial);

    // controls
    case DynSelectComponent.dynControl:
      return DynSelectComponent.createConfig(partial);

    case DynRadioComponent.dynControl:
      return DynRadioComponent.createConfig(partial);

    case DynInputComponent.dynControl:
    default:
      return DynInputComponent.createConfig(partial);
  }
}
