import { DynControlType } from './control.type';

export interface DynFormConfig {
  controls: DynControlConfig[];
}

export interface DynControlConfig {
  // hierarchy
  name?: string; // entity
  controls?: DynControlConfig[];
  // config
  dynControl: DynControlType;
  // dynParams: Observable<DynControlParams>;
  // contexts: { display: { dynControl, dynParams }, table: ... }
  // layout
  // filterOptions
  readonly [property: string]: unknown;
}
