/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export type MatDateFormats = {
  parse: {
    dateInput: any,
    datetimeInput: any,
    timeInput: any,
    monthInput: any,
    yearInput: any,
  },
  display: {
    dateInput: any,
    datetimeInput: any,
    timeInput: any,
    monthInput: any,
    yearInput: any,
    dateA11yLabel: any,
    monthLabel?: any,
    monthDayLabel: any,
    monthDayA11yLabel: any,
    monthYearLabel: any,
    monthYearA11yLabel: any,
    timeLabel: any,
  }
};
