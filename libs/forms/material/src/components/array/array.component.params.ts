import { DynControlParams } from '@myndpm/dyn-forms/core';

export interface DynArrayParams extends DynControlParams {
  title?: string;
  subtitle?: string;
  initItem?: boolean;
  addButton?: string;
  addColor?: string;
  removeButton?: string;
  removeColor?: string;
}
