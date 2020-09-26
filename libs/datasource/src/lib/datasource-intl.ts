import { Injectable } from '@angular/core';

/** DataSource messages that requires internationalization. */
@Injectable({
  providedIn: 'root',
})
export class MatDataSourceIntl<REQ = any> {
  /** A message to show when there's no resulting data. */
  emptyMsg: ((args?: REQ) => string) | string = 'No data available';

  /** A waiting message to show while loading the data. */
  waitMsg: string = 'Please wait...';

  /** A waiting message when the data is taking too long. */
  delayMsg: string = 'The data is still loading...';

  /** A timeout message if there's no response. */
  timeoutMsg: string = 'Loading has timed out, please try again.';
}
