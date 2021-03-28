import { DynControlType } from './control.type';

export interface DynControlConfig {
  // hierarchy
  name: string; // entity
  children?: DynControlConfig[];
  // config
  dynControl: DynControlType;
  // dynParams: DynControlParams;
  // contexts: { display: { dynControl, dynParams }, table: ... }
  // layout
  // filterOptions
  readonly [property: string]: unknown;
}
