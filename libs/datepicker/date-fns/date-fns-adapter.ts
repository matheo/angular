/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  Locale,
  parse,
  parseISO,
  setDay,
  setMonth,
  toDate,
  parseJSON,
  getHours,
  getMinutes,
  getMilliseconds,
  setMinutes,
  getSeconds,
  setSeconds,
  setHours,
  addHours,
  addMinutes,
  addSeconds,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz/esm';
import { enUS } from 'date-fns/esm/locale';
import { MAT_DATE_FNS_LOCALES } from './date-fns-locales';

const UTC_TIMEZONE = 'UTC';

/** Configurable options for {@see DateFnsAdapter}. */
export interface MatDateFnsAdapterOptions {
  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material components like DatePicker output dates.
   * {@default false}
   */
  useUtc: boolean;
}

/** InjectionToken for DateFnsAdapter to configure options. */
export const MAT_DATE_FNS_ADAPTER_OPTIONS = new InjectionToken<MatDateFnsAdapterOptions>(
  'MAT_DATE_FNS_ADAPTER_OPTIONS',
  {
    providedIn: 'root',
    factory: MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY,
  }
);

/** @docs-private */
export function MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY(): MatDateFnsAdapterOptions {
  return {
    useUtc: false,
  };
}

/** Creates an array of numbers. */
function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

/** Adapts date-fns Dates for use with Angular Material. */
@Injectable()
export class DateFnsAdapter extends DateAdapter<Date> {
  private _dateFnsLocale: Locale;

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Inject(MAT_DATE_FNS_LOCALES) private locales: Locale[],
    @Optional()
    @Inject(MAT_DATE_FNS_ADAPTER_OPTIONS)
    private options?: MatDateFnsAdapterOptions
  ) {
    super();

    try {
      this.setLocale(dateLocale || enUS);
    } catch (err) {
      this.setLocale(enUS);
    }
  }

  setLocale(locale: string | Locale) {
    if (!locale) {
      throw new Error(
        'setLocale should be called with the string locale code or date-fns Locale object'
      );
    }
    this._dateFnsLocale = this.getLocale(locale);
    super.setLocale(locale);
  }

  private getLocale = (localeCodeOrLocale: string | Locale): Locale => {
    if (localeCodeOrLocale && (localeCodeOrLocale as Locale).code) {
      return localeCodeOrLocale as Locale;
    }
    if (!this.locales || !this.locales.length) {
      throw new Error('locales array does not provided or is empty');
    }
    const locale = this.locales.find(
      (item) => item.code === localeCodeOrLocale
    );
    if (!locale) {
      throw new Error(`locale '${localeCodeOrLocale}' does not exist`);
    }
    return locale;
  };

  getYear(date: Date): number {
    return getYear(date);
  }

  getMonth(date: Date): number {
    return getMonth(date);
  }

  getDate(date: Date): number {
    return getDate(date);
  }

  getHours(date: Date): number {
    return getHours(date);
  }

  setHours(date: Date, hours: number): Date {
    return setHours(date, hours);
  }

  getMinutes(date: Date): number {
    return getMinutes(date);
  }

  setMinutes(date: Date, minutes: number): Date {
    return setMinutes(date, minutes);
  }

  getSeconds(date: Date): number {
    return getSeconds(date);
  }

  setSeconds(date: Date, seconds: number, ms?: number): Date {
    return setSeconds(date, seconds);
  }

  getMilliseconds(date: Date): number {
    return getMilliseconds(date);
  }

  getDayOfWeek(date: Date): number {
    return getDay(date);
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'LLLL',
      short: 'LLL',
      narrow: 'LLLLL',
    };

    const formatStr = map[style];
    const date = new Date();

    return range(0, 11).map((month) =>
      format(setMonth(date, month), formatStr, {
        locale: this._dateFnsLocale,
      })
    );
  }

  getDateNames(): string[] {
    return range(1, 31).map((day) => String(day));
  }

  getHourNames(): string[] {
    return range(0, 23).map((i) => (i === 0 ? '00' : String(i)));
  }

  getMinuteNames(): string[] {
    return range(0, 59).map(String);
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const map = {
      long: 'EEEE',
      short: 'EEE',
      narrow: 'EEEEE',
    };

    const formatStr = map[style];
    const date = new Date();

    return range(0, 6).map((month) =>
      format(setDay(date, month), formatStr, {
        locale: this._dateFnsLocale,
      })
    );
  }

  getYearName(date: Date): string {
    return format(date, 'yyyy', {
      locale: this._dateFnsLocale,
    });
  }

  getFirstDayOfWeek(): number {
    return this._dateFnsLocale.options.weekStartsOn;
  }

  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  clone(date: Date): Date {
    return toDate(date);
  }

  createDate(
    year: number,
    month: number,
    date: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): Date {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createDateWithOverflow(
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      ms
    );
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  today(): Date {
    return new Date();
  }

  parse(value: any, parseFormat: any): Date | null {
    if (value) {
      if (typeof value === 'string') {
        if (this.options.useUtc) {
          const d = parse(value.trim(), parseFormat, new Date(), {
            locale: this._dateFnsLocale,
          });
          return zonedTimeToUtc(d, UTC_TIMEZONE);
        }
        return parse(value.trim(), parseFormat, new Date(), {
          locale: this._dateFnsLocale,
        });
      }
      if (typeof value === 'number') {
        return toDate(value);
      }
      if (value instanceof Date) {
        return this.clone(value as Date);
      }
      return null;
    }
    return null;
  }

  format(date: Date, displayFormat: string): string {
    return format(date, displayFormat, { locale: this._dateFnsLocale });
  }

  addCalendarYears(date: Date, years: number): Date {
    return addYears(date, years);
  }

  addCalendarMonths(date: Date, months: number): Date {
    return addMonths(date, months);
  }

  addCalendarDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  addCalendarHours(date: Date, hours: number): Date {
    return addHours(date, hours);
  }

  addCalendarMinutes(date: Date, minutes: number): Date {
    return addMinutes(date, minutes);
  }

  addCalendarSeconds(date: Date, seconds: number, ms?: number): Date {
    return addSeconds(date, seconds);
  }

  toIso8601(date: Date): string {
    return date.toISOString();
  }

  deserialize(value: any): Date | null {
    if (value) {
      if (typeof value === 'string') {
        if (this.options.useUtc) {
          return parseJSON(value);
        }
        return parseISO(value);
      }
      if (typeof value === 'number') {
        return toDate(value);
      }
      if (value instanceof Date) {
        return this.clone(value as Date);
      }
      return null;
    }
    return null;
  }

  isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  invalid(): Date {
    return new Date(NaN);
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(
    year: number,
    month: number,
    date: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    ms: number = 0
  ): Date {
    const result = this._createDateInternal(
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      ms
    );

    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }

  private _createDateInternal(
    year: number,
    month: number,
    date: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): Date {
    if (this.options.useUtc) {
      return zonedTimeToUtc(
        new Date(year, month, date, hours, minutes, seconds, ms),
        UTC_TIMEZONE
      );
    }
    return new Date(year, month, date, hours, minutes, seconds, ms);
  }
}
