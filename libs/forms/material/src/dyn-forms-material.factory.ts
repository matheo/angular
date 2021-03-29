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

export type PartialConfig<T extends DynControlParams> = Partial<
  DynControlConfig<T>
>;

// type overloads
export function createConfig(
  type: 'CARD',
  partial: PartialConfig<DynCardParams>
): DynControlConfig;
export function createConfig(
  type: 'TEXT',
  partial: PartialConfig<DynInputParams>
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
    case DynInputComponent.dynControl:
    default:
      return DynInputComponent.createConfig(partial);
  }
}
