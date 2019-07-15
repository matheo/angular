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
  return `Removing stream`;
}

export function setValue(name: string): string {
  return `${name} setted:`;
}

export function srcAdding(src: any): string {
  return `Adding '${src}' stream`;
}

export function srcEmpty(name: string): string {
  return `Adding empty stream '${name}'`;
}

export function srcInvalid(): string {
  return `Empty stream provided!`;
}

export function srcConnect(): string {
  return `Connected`;
}

export function srcEmitted(src: any): string {
  return `Stream ${src} emitted:`;
}

export function srcOutput(): string {
  return `Stream outputs:`;
}

export function isAutoStarting(): string {
  return `DataSource starting automatically`;
}

export function notAutoStarting(length: any): string {
  return (
    `DataSource not auto starting with ${length.optional}` +
    ` optional and ${length.required} required streams`
  );
}

export function resolvedArgs(): string {
  return 'Resolved request';
}

export function queryResponse(): string {
  return 'Query response:';
}

export function queryTimeout(): string {
  return 'Query timeout count:';
}

export function responseTotal(): string {
  return 'Total returned:';
}

export function responseSuccess(result: any): Array<any> {
  const len = result.length;
  return [`Response succeed with ${len} item${len === 1 ? '' : 's'}`, result];
}

export function responseError(errors: any): Array<any> {
  return ['Response failed', errors];
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
