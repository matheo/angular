import { DynControlType } from './control.type';

export interface DynBaseConfig {
  // hierarchy
  name?: string; // optional entity
  controls?: DynControlConfig[];
  // config
  dynControl: DynControlType;
  // dynParams?: Observable<DynControlParams>;
}

export interface DynControlConfig extends DynBaseConfig {
  // hierarchy
  name: string; // mandatory entity
  // config
  // contexts: { display: { dynControl, dynParams }, table: ... }
  // filterOptions
  readonly [property: string]: unknown;
}

export type DynFormControls = Array<DynBaseConfig | DynControlConfig>;
