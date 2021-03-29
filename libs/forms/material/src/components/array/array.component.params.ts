import { DynControlParams } from '@matheo/dyn-forms/core';

export interface DynArrayParams extends DynControlParams {
  title?: string;
  subtitle?: string;
  color?: string;
  addButton?: string;
  removeButton?: string;
}
