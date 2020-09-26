import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { delayMsg, emptyMsg, timeoutMsg, waitMsg } from './messages';

/**
 * DataSource Config
 */

export interface DataSourceConfig {
  debug?: boolean;
  autoStart: boolean;
  errorHandler?: (err: any) => string;
  showErrors: boolean;
  emptyMsg?: ((args?: any) => string) | string;
  waitMsg?: string;
  delayMsg?: string;
  timeoutMsg?: string;
  waitMs: number; // ms to wait before show the waitMsg
  intervalMs: number; // timer interval to timeout the request
  progressMode: ProgressSpinnerMode;
}

export const defaultConfig: DataSourceConfig = {
  debug: false,
  autoStart: true,
  showErrors: true,
  emptyMsg: emptyMsg,
  waitMsg: waitMsg(),
  delayMsg: delayMsg(),
  timeoutMsg: timeoutMsg(),
  waitMs: 5000,
  intervalMs: 10000,
  progressMode: 'indeterminate',
};
