/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {MatDateFormats} from './date-formats';


export const MAT_NATIVE_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: null,
    datetimeInput: null,
    timeInput: null,
    monthInput: null,
    yearInput: null,
  },
  display: {
    dateInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
    datetimeInput: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    },
    timeInput: {hour: 'numeric', minute: 'numeric'},
    monthInput: {month: 'short', year: 'numeric'},
    yearInput: {year: 'numeric'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthLabel: {month: 'short'},
    monthDayLabel: {month: 'short', day: 'numeric'},
    monthDayA11yLabel: {month: 'long', day: 'numeric'},
    monthYearLabel: {year: 'numeric', month: 'short'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
    timeLabel: {hours: 'numeric', minutes: 'numeric'},
  }
};
