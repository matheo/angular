import { DynControlParams } from '@matheo/dyn-forms/core';

export interface DynArrayParams extends DynControlParams {
  title?: string;
  subtitle?: string;
  addButton?: string;
  addColor?: string;
  removeButton?: string;
  removeColor?: string;
}
