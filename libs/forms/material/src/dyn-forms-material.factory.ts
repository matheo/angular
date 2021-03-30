import {
  DynControlConfig,
  DynControlParams,
  DynControlType,
  DynPartialControlConfig,
} from '@matheo/dyn-forms/core';
import {
  DynCardComponent,
  DynCardParams,
  DynInputComponent,
  DynInputParams,
} from './components';
import { DynArrayComponent } from './components/array/array.component';
import { DynArrayParams } from './components/array/array.component.params';
import { DynGroupComponent } from './components/group/group.component';
import { DynRadioComponent } from './components/radio/radio.component';
import { DynRadioParams } from './components/radio/radio.component.params';
import { DynSelectComponent } from './components/select/select.component';
import { DynSelectParams } from './components/select/select.component.params';

// type overloads
export function createConfig(
  type: typeof DynArrayComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynArrayParams>>
): DynControlConfig;
export function createConfig(
  type: typeof DynCardComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynCardParams>>
): DynControlConfig;
export function createConfig(
  type: typeof DynGroupComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynControlParams>>
): DynControlConfig;
export function createConfig(
  type: typeof DynInputComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynInputParams>>
): DynControlConfig;
export function createConfig(
  type: typeof DynRadioComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynRadioParams>>
): DynControlConfig;
export function createConfig(
  type: typeof DynSelectComponent.dynControl,
  partial: DynPartialControlConfig<Partial<DynSelectParams>>
): DynControlConfig;

// factory
export function createConfig(
  type: DynControlType,
  partial: DynPartialControlConfig<any>
): DynControlConfig {
  switch (type) {
    // containers
    case DynArrayComponent.dynControl:
      return DynArrayComponent.createConfig(partial);

    case DynCardComponent.dynControl:
      return DynCardComponent.createConfig(partial);

    case DynGroupComponent.dynControl:
      return DynGroupComponent.createConfig(partial);

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
