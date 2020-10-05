import { Observable } from 'rxjs';

/**
 * Types
 */

// internal options
export interface DataSourceOpts {
  forceReload?: number;
}

export interface DataSourceStream<T> {
  name: string;
  stream: Observable<Partial<T>>;
  optional?: boolean;
  weight?: number;
}

/**
 * Lists, Selectors and AutoCompleters Options
 */

export interface DataSourceItem {
  value: any;
  title: any;
  subtitle?: any;
  note?: any;
  route?: any;
  disabled?: boolean;
  [field: string]: any;
}
