/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


/** Datepicker data that requires internationalization. */
@Injectable({providedIn: 'root'})
export class MatDatepickerIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the calendar popup (used by screen readers). */
  calendarLabel: string = 'Calendar';

  /** A label for the button used to open the calendar popup (used by screen readers). */
  openCalendarLabel: string = 'Open calendar';

  /** Label for the button used to close the calendar popup. */
  closeCalendarLabel: string = 'Close calendar';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel: string = 'Previous month';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel: string = 'Next month';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel: string = 'Previous year';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel: string = 'Next year';

  /** A label for the 'AM' button (used by screen readers). */
  setToAMLabel = 'Set date to AM';

  /** A label for the 'PM' button (used by screen readers). */
  setToPMLabel = 'Set date to PM';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel: string = 'Previous 20 years';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel: string = 'Next 20 years';

  /** A label for the 'switch to minute view' button (used by screen readers). */
  switchToMinuteViewLabel = 'Change to minute view';

  /** A label for the 'switch to hour view' button (used by screen readers). */
  switchToHourViewLabel = 'Change to hour view';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Change to month view';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToYearViewLabel = 'Change to year view';

  /** A label for the 'switch to years view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Change to years view';

  /** Formats a range of years. */
  formatYearRange(start: string, end: string): string {
    return `${start} \u2013 ${end}`;
  }
}
