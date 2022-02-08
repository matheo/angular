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
  DateTime as LuxonDateTime,
  Info as LuxonInfo,
  DateTimeOptions as LuxonDateTimeOptions,
} from 'luxon';

/** Configurable options for {@see LuxonDateAdapter}. */
export interface MatLuxonDateAdapterOptions {
  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material components like DatePicker output dates.
   * {@default false}
   */
  useUtc: boolean;

  /**
   * Luxon does not have support for retrieving the first day of the week.
   * This allows supplying a custom function to override it.
   * Remember that you need to return 0 = Sunday, 1 = Monday
   */
  firstDayOfWeek?: (locale: string) => number;
}

/** InjectionToken for LuxonDateAdapter to configure options. */
export const MAT_LUXON_DATE_ADAPTER_OPTIONS = new InjectionToken<MatLuxonDateAdapterOptions>(
  'MAT_LUXON_DATE_ADAPTER_OPTIONS',
  {
    providedIn: 'root',
    factory: MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY,
  }
);

/** @docs-private */
export function MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY(): MatLuxonDateAdapterOptions {
  return {
    useUtc: false,
  };
}

/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, (i) => (i === 0 ? '00' : String(i)));

/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, String);

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

/** Adapts Luxon Dates for use with Angular Material. */
@Injectable()
export class LuxonDateAdapter extends DateAdapter<LuxonDateTime> {
  private _useUTC: boolean;
  private _getFirstDayOfWeek?: MatLuxonDateAdapterOptions['firstDayOfWeek'];

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string,
    @Optional()
    @Inject(MAT_LUXON_DATE_ADAPTER_OPTIONS)
    options?: MatLuxonDateAdapterOptions,
  ) {
    super();
    this._useUTC = options ? !!options.useUtc : false;
    this._getFirstDayOfWeek = options?.firstDayOfWeek;
    this.setLocale(dateLocale || LuxonDateTime.local().locale);
  }

  setLocale(locale: string) {
    super.setLocale(locale);
  }

  getYear(date: LuxonDateTime): number {
    return date.year;
  }

  getMonth(date: LuxonDateTime): number {
    // Luxon works with 1-indexed months whereas our code expects 0-indexed.
    return date.month - 1;
  }

  getDate(date: LuxonDateTime): number {
    return date.day;
  }

  getHours(date: LuxonDateTime): number {
    return date.hour;
  }

  setHours(date: LuxonDateTime, hour: number): LuxonDateTime {
    return date.set({ hour });
  }

  getMinutes(date: LuxonDateTime): number {
    return date.minute;
  }

  setMinutes(date: LuxonDateTime, minute: number): LuxonDateTime {
    return date.set({ minute });
  }

  getSeconds(date: LuxonDateTime): number {
    return date.second;
  }

  setSeconds(date: LuxonDateTime, second: number, ms?: number): LuxonDateTime {
    return date.set({ second, millisecond: ms });
  }

  getMilliseconds(date: LuxonDateTime): number {
    return date.millisecond;
  }

  getDayOfWeek(date: LuxonDateTime): number {
    return date.weekday === 7 ? 0 : date.weekday;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return LuxonInfo.months(style, { locale: this.locale });
  }

  getDateNames(): string[] {
    // At the time of writing, Luxon doesn't offer similar
    // functionality so we have to fall back to the Intl API.
    const dtf = new Intl.DateTimeFormat(this.locale, {
      day: 'numeric',
      timeZone: 'utc',
    });

    // Format a UTC date in order to avoid DST issues.
    return range(31, (i) => {
      return dtf.format(LuxonDateTime.utc(2017, 1, i + 1).toJSDate());
    });
  }

  getHourNames(): string[] {
    return DEFAULT_HOUR_NAMES;
  }

  getMinuteNames(): string[] {
    return DEFAULT_MINUTE_NAMES;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Note that we shift the array once, because Luxon returns Monday as the
    // first day of the week, whereas our logic assumes that it's Sunday. See:
    // https://moment.github.io/luxon/api-docs/index.html#infoweekdays
    const days = LuxonInfo.weekdays(style, { locale: this.locale });
    days.unshift(days.pop()!);
    return days;
  }

  getYearName(date: LuxonDateTime): string {
    return date.toFormat('yyyy');
  }

  getFirstDayOfWeek(): number {
    // Luxon doesn't have support for getting the first day of the week.
    if (this._getFirstDayOfWeek) {
      return this._getFirstDayOfWeek(this.locale);
    }
    return 0;
  }

  getNumDaysInMonth(date: LuxonDateTime): number {
    return date.daysInMonth;
  }

  clone(date: LuxonDateTime): LuxonDateTime {
    return LuxonDateTime.fromObject(date.toObject({ includeConfig: true }));
  }

  createDate(
    year: number,
    month: number,
    date: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    ms: number = 0
  ): LuxonDateTime {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    // Luxon uses 1-indexed months so we need to add one to the month.
    const result = this._useUTC
      ? LuxonDateTime.utc(year, month + 1, date, hours, minutes, seconds, ms)
      : LuxonDateTime.local(year, month + 1, date, hours, minutes, seconds, ms);

    if (!this.isValid(result)) {
      throw Error(`Invalid date "${date}". Reason: "${result.invalidReason}".`);
    }

    return result.setLocale(this.locale);
  }

  today(): LuxonDateTime {
    return (this._useUTC ? LuxonDateTime.utc() : LuxonDateTime.local()).setLocale(
      this.locale
    );
  }

  parse(value: any, parseFormat: string | string[]): LuxonDateTime | null {
    const options: LuxonDateTimeOptions = this._getOptions();

    if (typeof value == 'string' && value.length > 0) {
      const iso8601Date = LuxonDateTime.fromISO(value, options);

      if (this.isValid(iso8601Date)) {
        return iso8601Date;
      }

      const parseFormats = Array.isArray(parseFormat)
        ? parseFormat
        : [parseFormat];
      for (const format of parseFormats) {
        const fromFormat = LuxonDateTime.fromFormat(value, format, options);

        if (this.isValid(fromFormat)) {
          return fromFormat;
        }
      }

      return this.invalid();
    } else if (typeof value === 'number') {
      return LuxonDateTime.fromMillis(value, options);
    } else if (value instanceof Date) {
      return LuxonDateTime.fromJSDate(value, options);
    } else if (value instanceof LuxonDateTime) {
      return LuxonDateTime.fromMillis(value.toMillis(), options);
    }

    return null;
  }

  format(date: LuxonDateTime, displayFormat: string): string {
    if (!this.isValid(date)) {
      throw Error('LuxonDateAdapter: Cannot format invalid date.');
    }

    let result = date.setLocale(this.locale);
    if (this._useUTC) {
      result = result.toUTC();
    }
    return result.toFormat(displayFormat);
  }

  addCalendarYears(date: LuxonDateTime, years: number): LuxonDateTime {
    return date.plus({ years }).setLocale(this.locale);
  }

  addCalendarMonths(date: LuxonDateTime, months: number): LuxonDateTime {
    return date.plus({ months }).setLocale(this.locale);
  }

  addCalendarDays(date: LuxonDateTime, days: number): LuxonDateTime {
    return date.plus({ days }).setLocale(this.locale);
  }

  addCalendarHours(date: LuxonDateTime, hours: number): LuxonDateTime {
    return date.plus({ hours });
  }

  addCalendarMinutes(date: LuxonDateTime, minutes: number): LuxonDateTime {
    return date.plus({ minutes });
  }

  addCalendarSeconds(date: LuxonDateTime, seconds: number, ms?: number): LuxonDateTime {
    return date.plus({ seconds, milliseconds: ms });
  }

  toIso8601(date: LuxonDateTime): string {
    return date.toISO();
  }

  /**
   * Returns the given value if given a valid Luxon or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid DateTime and empty
   * string into null. Returns an invalid date for all other values.
   */
  deserialize(value: any): LuxonDateTime | null {
    const options = this._getOptions();
    let date;
    if (value instanceof Date) {
      date = LuxonDateTime.fromJSDate(value, options);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = LuxonDateTime.fromISO(value, options);
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: any): boolean {
    return obj instanceof LuxonDateTime;
  }

  isValid(date: LuxonDateTime): boolean {
    return date.isValid;
  }

  invalid(): LuxonDateTime {
    return LuxonDateTime.invalid('Invalid Luxon DateTime object.');
  }

  /** Gets the options that should be used when constructing a new `DateTime` object. */
  private _getOptions(): LuxonDateTimeOptions {
    return {
      zone: this._useUTC ? 'utc' : undefined,
      locale: this.locale,
    };
  }
}
