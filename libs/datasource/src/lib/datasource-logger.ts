import { DataSourceConfig } from './config';

/**
 * Logging Handler
 */
export class DataSourceLogger {
  /**
   * Errors Collection
   */
  private _errors: { [errorCode: string]: string } = {};

  set config(config: DataSourceConfig) {
    this._config = config;
  }
  private _config: DataSourceConfig;

  constructor(private sourceName: string) {}

  /**
   * Error Management Methods
   */

  getErrors() {
    return this._errors;
  }

  addError(errorCode: string, error: string | { message: string }): void {
    this._errors[errorCode] = typeof error === 'string' ? error : error.message;
  }

  handleError(errorCode: string, error: any): void {
    this._config.errorHandler
      ? this.addError(errorCode, this._config.errorHandler(error))
      : this.addError(errorCode, error);
  }

  hasError(errorCode: string): boolean {
    return this._errors.hasOwnProperty(errorCode);
  }

  hasErrors(force = false): boolean {
    return (
      (this._config.showErrors || force) && !!Object.keys(this._errors).length
    );
  }

  getTimeoutError(attempt: number) {
    switch (attempt) {
      case 0:
        return this._config.waitMsg;
      case 1:
        return this._config.delayMsg;
      default:
        throw new Error(this._config.timeoutMsg);
    }
  }

  clearErrors() {
    this._errors = {};
  }

  /**
   * Debug Utils
   */

  // display a message according a condition
  debug(truthy: string, falsy?: string, condition: any = true) {
    if (this._config.debug) {
      if (condition) {
        console.log(`${this.sourceName}:`, truthy);
      } else if (falsy) {
        console.log(`${this.sourceName}:`, falsy);
      }
    }
  }

  // logs an object if debug mode is enabled
  print(message: string, obj: any) {
    if (this._config.debug) {
      console.log(`${this.sourceName}:`, message, obj);
    }
  }

  // throw an error if the condition is truthy
  check(condition: any, message: string) {
    if (condition) {
      throw new Error(`${this.sourceName}: ${message}`);
    }
  }
}
