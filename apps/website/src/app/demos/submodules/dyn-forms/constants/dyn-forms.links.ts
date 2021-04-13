import { SectionAction, SectionBadge } from '../../../../shared';

export const badges: SectionBadge[] = [
  {
    link: 'https://github.com/myndpm/open-source/tree/master/libs/forms',
    img: 'https://img.shields.io/badge/%40myndpm-dyn--forms-brightgreen',
    alt: 'Package',
  },
  {
    link: 'https://www.npmjs.com/package/@myndpm/dyn-forms',
    img: 'https://badge.fury.io/js/%40myndpm%2Fdyn-forms.svg',
    alt: 'NPM Badge',
  },
  {
    link: 'https://npmcharts.com/compare/@myndpm/dyn-forms?minimal=true',
    img: 'https://img.shields.io/npm/dm/@myndpm/dyn-forms.svg?style=flat',
    alt: 'NPM Downloads',
  },
];

export const actions: SectionAction[] = [
  {
    link:
      'https://stackblitz.com/edit/myndpm-dyn-forms?file=src/app/simple-form/simple.form.ts',
    ionicon: 'logo-angular',
    tooltip: 'Stackblitz',
  },
  {
    link:
      'https://github.com/myndpm/open-source/blob/master/apps/demos/src/app/demos/submodules/dyn-forms/components/simple/simple.form.ts',
    icon: 'code',
    tooltip: 'See source code',
  },
  {
    link: 'https://prezi.com/view/4Ok1bgCWvf0g26FMVwfx/',
    ionicon: 'easel-outline',
    tooltip: 'Prezi',
  },
  {
    link:
      'https://matheo.medium.com/a-new-approach-to-have-dynamic-forms-in-angular-683a2c417661',
    ionicon: 'logo-medium',
    tooltip: 'Medium',
  },
];
