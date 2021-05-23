import { InjectionToken } from '@angular/core';
import { Locale } from 'date-fns';

export const MAT_DATE_FNS_LOCALES = new InjectionToken<Locale[]>(
  'MAT_DATE_FNS_LOCALES'
);
