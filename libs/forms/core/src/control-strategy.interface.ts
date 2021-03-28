import { DynControlType } from './control.type';

// T (value), P (params) :: to be typed by the component.genConfig()
export interface DynControlStrategy {
  dynControl: DynControlType;
  // dynParams: DynControlParams;
  /*
  the strategy needs to be implemented by the control itself?
  or provided/overriden via config?
  dynStuff: DynStrategyClass {
    abstract getValue(form, config) => T
    getRequestValue?
  }
  */
}
