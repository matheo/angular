import { DynControlType } from './control.type';

export interface DynFormConfig {
  controls: DynBaseConfig[];
}

export interface DynBaseConfig {
  // hierarchy
  controls?: DynControlConfig[];
  // config
  dynControl: DynControlType;
  // dynParams?: Observable<DynControlParams>;
}

export interface DynControlConfig extends DynBaseConfig {
  // hierarchy
  name: string; // entity
  // config
  // contexts: { display: { dynControl, dynParams }, table: ... }
  // filterOptions
  readonly [property: string]: unknown;
}
