import { DynControlParams } from '@matheo/dyn-forms/core';

export interface DynInputParams extends DynControlParams {
  type: string;
  label: string;
  placeholder: string;
  hint?: string;
}
