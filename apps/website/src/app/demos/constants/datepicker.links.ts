import { SectionAction, SectionBadge } from '../../shared';

export const badges: SectionBadge[] = [
  {
    link: 'https://github.com/matheo/angular/tree/master/libs/datepicker',
    img: 'https://img.shields.io/badge/%40matheo-datepicker-brightgreen',
    alt: 'Package',
  },
  {
    link: 'https://www.npmjs.com/package/@matheo/datepicker',
    img: 'https://badge.fury.io/js/%40matheo%2Fdatepicker.svg',
    alt: 'NPM Badge',
  },
  {
    link: 'https://npmcharts.com/compare/@matheo/datepicker?minimal=true',
    img: 'https://img.shields.io/npm/dm/@matheo/datepicker.svg?style=flat',
    alt: 'NPM Downloads',
  },
];

export const actions: SectionAction[] = [
  {
    link:
      'https://github.com/matheo/angular/blob/master/apps/website/src/app/demos/components/datepicker/datepicker.component.html',
    icon: 'code',
    tooltip: 'See source code',
  },
  {
    link: 'https://www.npmjs.com/package/@matheo/datepicker',
    ionicon: 'logo-npm',
    tooltip: 'NPM Package',
  },
  {
    link: 'https://github.com/angular/components/issues/5648',
    ionicon: 'logo-github',
    tooltip: 'Material Issue',
  },
];
