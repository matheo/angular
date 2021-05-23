/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import {
  DateAdapter as MaterialDateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { DateAdapter } from '@matheo/datepicker/core';
import {
  MAT_DATE_FNS_ADAPTER_OPTIONS,
  DateFnsAdapter,
} from './date-fns-adapter';
import { MAT_DATE_FNS_FORMATS } from './date-fns-formats';
import { MAT_DATE_FNS_LOCALES } from './date-fns-locales';

export * from './date-fns-adapter';
export * from './date-fns-formats';
export * from './date-fns-locales';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_ADAPTER_OPTIONS],
    },
    {
      provide: MaterialDateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE, MAT_DATE_FNS_ADAPTER_OPTIONS],
    },
  ],
})
export class DateFnsModule {}

@NgModule({
  imports: [DateFnsModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    { provide: MAT_DATE_FNS_LOCALES, useValue: [] },
  ],
})
export class MatDateFnsModule {}
