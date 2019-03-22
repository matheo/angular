import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { delayMsg, emptyMsg, timeoutMsg, waitMsg } from './messages';

/**
 * DataSource Config
 */

export interface DataSourceConfig {
  debug?: boolean;
  autoStart: boolean;
  errorHandler?: ((err: any) => string);
  showErrors: boolean;
  emptyMsg: (() => string);
  waitMsg: string;
  delayMsg: string;
  timeoutMsg: string;
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
  progressMode: 'indeterminate'
};
