import { Observable } from 'rxjs';

/**
 * Constants
 */

export const REQUIRED_INIT = 'required.init';

export const TRIGGER_INIT = 'trigger.init';
export const TRIGGER_REFRESH = 'trigger.refresh';
export const TRIGGER_RELOAD = 'trigger.reload';

/**
 * Types
 */

export type DataSourceGetter<T> = () => Partial<T>;

export interface DataSourceOpts {
  forceReload?: boolean;
}

export interface DataSourceStream<T> {
  name?: string;
  required?: boolean;
  weight?: number;
  stream: Observable<any>;
  getter: DataSourceGetter<T>;
}

/**
 * Lists, Selectors and AutoCompleters Options
 */

export interface DataSourceItem {
  value: any;
  title: any;
  subtitle?: any;
  note?: any;
  disabled?: boolean;
}
