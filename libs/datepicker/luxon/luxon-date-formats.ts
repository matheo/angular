/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MatDateFormats } from '@matheo/datepicker';

export const MAT_LUXON_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D',
    datetimeInput: 'f',
    timeInput: 'h:mm',
    monthInput: 'LLL',
    yearInput: 'yyyy',
  },
  display: {
    dateInput: 'D',
    datetimeInput: 'f',
    timeInput: 'T',
    monthInput: 'LLL yyyy',
    yearInput: 'yyyy',
    dateA11yLabel: 'DD',
    monthLabel: 'LLL',
    monthDayLabel: 'LLL d',
    monthDayA11yLabel: 'LLLL d',
    monthYearLabel: 'LLL yyyy',
    monthYearA11yLabel: 'LLLL yyyy',
    timeLabel: 'T',
  },
};
