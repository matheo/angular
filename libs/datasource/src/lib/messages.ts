/**
 * Config Texts
 */

export function emptyMsg(): string {
  return 'No data available';
}

export function waitMsg(): string {
  return 'Please wait...';
}

export function delayMsg(): string {
  return 'The data is still loading...';
}

export function timeoutMsg(): string {
  return 'Loading has timed out, please try again.';
}

/**
 * Debug Messages
 */

export function removingStream(): string {
  return `SETUP Removing stream`;
}

export function setValue(name: string): string {
  return `SETUP ${name} =`;
}

export function srcAdding(src: any): any[] {
  return [`SETUP Adding stream`, src];
}

export function srcEmpty(name: string): string {
  return `SETUP Adding empty stream '${name}'`;
}

export function srcInvalid(): string {
  return `SETUP Empty stream provided!`;
}

export function srcConnect(): string {
  return `REQ Connected`;
}

export function srcEmitted(src: any): string {
  return `REQ Stream ${src} emitted`;
}

export function srcOutput(): string {
  return `REQ Streams output`;
}

export function isAutoStarting(): string {
  return `REQ DataSource starting automatically`;
}

export function notAutoStarting(length: number): string {
  return `REQ DataSource not auto starting with ${length} streams`;
}

export function resolvedArgs(distinct: boolean): string {
  return `REQ Resolved ${distinct ? 'the SAME' : ''} request`;
}

export function queryResponse(): string {
  return 'RAW Query response:';
}

export function queryTimeout(): string {
  return 'RAW Query timeout count:';
}

export function responseTotal(): string {
  return 'RAW Calculated total:';
}

export function responseSuccess(result: any): Array<any> {
  const len = result.length;
  return [`RES succeed with ${len} item${len === 1 ? '' : 's'}`, result];
}

export function responseError(errors: any): Array<any> {
  return ['RES failed', errors];
}

export function disconnecting(): string {
  return 'Disconnecting';
}

/**
 * Error Messages
 */

export function addWhenRunning(item: any): string {
  return `Adding "${item}" after the DataSource is already running.`;
}

export function rmWhenRunning(item: string): string {
  return `Trying to remove "${item}" after the DataSource is already running.`;
}

export function nonNumeric(name: string): string {
  return 'Non numeric ${name} passed';
}

export function missingDataSourceInput(): string {
  return 'mat-datasource must receive a dataSource input';
}

export function resException(): string {
  return 'Exception processing the result';
}
