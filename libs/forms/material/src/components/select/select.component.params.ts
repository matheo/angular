import { MatOption } from '@angular/material/core';
import { DynControlParams, DynOption } from '@myndpm/dyn-forms/core';

export interface DynSelectParams extends DynControlParams {
  label?: string;
  placeholder: string;
  multiple?: boolean;
  options: DynOption[];
  compareWith: (o1: any, o2: any) => boolean;
  sortComparator: (a: MatOption, b: MatOption, options: MatOption[]) => number;
  panelClass: string | string[] | Set<string> | { [key: string]: any };
}
