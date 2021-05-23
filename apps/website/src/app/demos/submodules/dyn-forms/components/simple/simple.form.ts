import { DynFormConfig } from '@myndpm/dyn-forms';
import { DynControlParams } from '@myndpm/dyn-forms/core';
import { createMatConfig } from '@myndpm/dyn-forms/ui-material';
import { Observable } from 'rxjs';

export function simpleForm(
  obsParams: Observable<DynControlParams>
): DynFormConfig<'edit' | 'display'> {
  // typed mode
  return {
    modes: {
      edit: { params: { readonly: false } },
      display: { params: { readonly: true } },
    },
    controls: [
      createMatConfig('CARD', {
        name: 'billing',
        cssClass: 'row',
        params: obsParams,
        controls: [
          createMatConfig('INPUT', {
            name: 'firstName',
            cssClass: 'col-sm-6 col-md-4',
            validators: ['required'],
            params: { label: 'First Name *' },
          }),
          createMatConfig('INPUT', {
            name: 'lastName',
            cssClass: 'col-sm-6 col-md-4',
            validators: ['required'],
            params: { label: 'Last Name *' },
          }),
          createMatConfig('DIVIDER', {
            params: { invisible: true },
          }),
          createMatConfig('INPUT', {
            name: 'address1',
            cssClass: 'col-12 col-md-8',
            validators: { required: null, minLength: 4 },
            params: { label: 'Address Line 1 *' },
          }),
          createMatConfig('INPUT', {
            name: 'address2',
            cssClass: 'col-12 col-md-8',
            params: { label: 'Address Line 2' },
          }),
          createMatConfig('DIVIDER', {
            params: { invisible: true },
          }),
          createMatConfig('SELECT', {
            name: 'country',
            cssClass: 'col-sm-6 col-md-4',
            default: 'CO',
            validators: ['required'],
            params: {
              label: 'Country',
              options: [
                { text: '- Choose one -', value: null },
                { text: 'Colombia', value: 'CO' },
                { text: 'United States', value: 'US' },
                { text: 'China', value: 'CN' },
                { text: 'Russia', value: 'RU' },
                { text: 'Other', value: 'XX' },
              ],
            },
            modes: {
              display: {
                control: 'INPUT',
                paramFns: { getValue: 'getOptionText' },
              },
            },
          }),
          createMatConfig('INPUT', {
            name: 'zipCode',
            cssClass: 'col-sm-6 col-md-4',
            match: [
              {
                matchers: ['DISABLE'],
                operator: 'AND',
                when: [
                  { path: 'firstName', value: 'Mateo' },
                  { path: 'country', value: 'CO' },
                ],
              },
              {
                matchers: ['HIDE'],
                when: [{ path: 'account', value: 'GUEST' }],
              },
            ],
            params: { label: 'Postal Code' },
          }),
        ],
      }),
      createMatConfig('RADIO', {
        name: 'account',
        params: {
          options: [
            { text: 'Create Account', value: 'CREATE' },
            { text: 'Checkout as a Guest', value: 'GUEST' },
          ],
        },
        modes: {
          display: {
            control: 'INPUT',
            paramFns: { getValue: 'getOptionText' },
          },
        },
      }),
      createMatConfig('ARRAY', {
        name: 'products',
        cssClass: 'row',
        params: {
          title: 'Products',
          subtitle: 'Items to checkout',
          initItem: true,
        },
        controls: [
          createMatConfig('INPUT', {
            name: 'product',
            cssClass: 'col-6 col-md-8',
            validators: ['required'],
            params: { label: 'Product Name *' },
          }),
          createMatConfig('INPUT', {
            name: 'quantity',
            cssClass: 'col-5 col-md-3',
            validators: ['required', ['min', 1]],
            params: { label: 'Quantity *', type: 'number' },
          }),
        ],
      }),
    ],
  };
}
