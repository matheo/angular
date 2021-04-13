import { SectionAction, SectionBadge } from '../../../../shared';

export const badges: SectionBadge[] = [
  {
    link: 'https://github.com/matheo/angular/tree/master/libs/datasource',
    img: 'https://img.shields.io/badge/%40matheo-datasource-brightgreen',
    alt: 'Package',
  },
  {
    link: 'https://www.npmjs.com/package/@matheo/datasource',
    img: 'https://badge.fury.io/js/%40matheo%2Fdatasource.svg',
    alt: 'NPM Badge',
  },
  {
    link: 'https://npmcharts.com/compare/@matheo/datasource?minimal=true',
    img: 'https://img.shields.io/npm/dm/@matheo/datasource.svg?style=flat',
    alt: 'NPM Downloads',
  },
];

export const actions: SectionAction[] = [
  {
    link:
      'https://github.com/matheo/angular/blob/master/apps/website/src/app/demos/submodules/datasource/datasource.module.ts',
    icon: 'code',
    tooltip: 'See source code',
  },
  {
    link: 'https://www.npmjs.com/package/@matheo/datasource',
    ionicon: 'logo-npm',
    tooltip: 'NPM Package',
  },
  {
    link:
      'https://medium.com/@matheo/reactive-datasource-for-angular-1d869b0155f6',
    ionicon: 'logo-medium',
    tooltip: 'Medium',
  },
];
