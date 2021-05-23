/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MatDateFormats } from '@matheo/datepicker/core';

// https://date-fns.org/v2.21.3/docs/format

export const MAT_DATE_FNS_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'P',
    datetimeInput: 'f',
    timeInput: 'H:mm',
    monthInput: 'MMM',
    yearInput: 'yyyy',
  },
  display: {
    dateInput: 'P',
    datetimeInput: 'Pp',
    timeInput: 'p',
    monthInput: 'MMM yyyy',
    yearInput: 'yyyy',
    dateA11yLabel: 'PP',
    monthLabel: 'MMM',
    monthDayLabel: 'MMM d',
    monthDayA11yLabel: 'MMMM d',
    monthYearLabel: 'MMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
    timeLabel: 'p',
  },
};
