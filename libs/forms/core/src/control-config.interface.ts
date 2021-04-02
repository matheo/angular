import { AbstractControlOptions } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynControlParams } from './control-params.interface';
import { DynControlType, DynInstanceType } from './control.types';

export interface DynBaseConfig<P extends DynControlParams = DynControlParams> {
  // config
  control: DynControlType;
  instance: DynInstanceType;
  // hierarchy
  name?: string; // optional fieldName
  controls?: DynControlConfig[];
  // customizations
  params?: P | Observable<P>;
  options?: AbstractControlOptions;
}

export interface DynControlConfig<P extends DynControlParams = DynControlParams>
  extends DynBaseConfig<P> {
  // hierarchy
  name: string; // mandatory fieldName
  // customizations
  // layout?: { cssClass, colSpan }
  // errorHandler: (errors: ValidationErrors) => string
  // contextHandlers: { display: { dynControl, dynParams }, table: ... }
  // filterOptions
}

export type DynPartialControlConfig<
  P extends DynControlParams = DynControlParams
> = Omit<DynControlConfig<P>, 'control' | 'instance'>;

export type DynFormControls = Array<DynBaseConfig | DynControlConfig>;
