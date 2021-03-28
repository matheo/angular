import { Observable } from 'rxjs';
import { DynControlParams } from './control-params.interface';
import { DynControlType } from './control.type';

export interface DynBaseConfig<P extends DynControlParams = DynControlParams> {
  // hierarchy
  name?: string; // optional entity
  controls?: DynControlConfig[];
  // config
  dynControl: DynControlType;
  dynParams?: P | Observable<P>;
}

export interface DynControlConfig<P extends DynControlParams = DynControlParams>
  extends DynBaseConfig<P> {
  // hierarchy
  name: string; // mandatory entity
  // config
  // contexts: { display: { dynControl, dynParams }, table: ... }
  // filterOptions
  readonly [property: string]: unknown;
}

export type DynFormControls = Array<DynBaseConfig | DynControlConfig>;
