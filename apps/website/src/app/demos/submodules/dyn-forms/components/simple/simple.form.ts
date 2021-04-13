import { Validators } from '@angular/forms';
import { DynFormConfig } from '@myndpm/dyn-forms';
import { DynControlParams } from '@myndpm/dyn-forms/core';
import { createMatConfig } from '@myndpm/dyn-forms/ui-material';
import { Observable } from 'rxjs';

export function simpleForm(
  obsParams: Observable<DynControlParams>
): DynFormConfig {
  return {
    controls: [
      createMatConfig('CARD', {
        name: 'billing',
        params: obsParams,
        controls: [
          createMatConfig('INPUT', {
            name: 'firstName',
            params: { label: 'First Name *' },
            options: { validators: [Validators.required] },
          }),
          createMatConfig('INPUT', {
            name: 'lastName',
            params: { label: 'Last Name *' },
            options: { validators: [Validators.required] },
          }),
          createMatConfig('INPUT', {
            name: 'address1',
            params: { label: 'Address Line 1 *' },
            options: { validators: [Validators.required] },
          }),
          createMatConfig('INPUT', {
            name: 'address2',
            params: { label: 'Address Line 2' },
          }),
          createMatConfig('SELECT', {
            name: 'country',
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
            options: { validators: [Validators.required] },
          }),
          createMatConfig('INPUT', {
            name: 'zipCode',
            params: { label: 'Postal Code *' },
            options: { validators: [Validators.required, Validators.min(0)] },
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
      }),
      createMatConfig('ARRAY', {
        name: 'products',
        params: {
          title: 'Products',
          subtitle: 'Items to checkout',
          initItem: true,
        },
        controls: [
          createMatConfig('INPUT', {
            name: 'product',
            params: { label: 'Product Name *' },
            options: { validators: [Validators.required] },
          }),
          createMatConfig('INPUT', {
            name: 'quantity',
            params: { label: 'Quantity *', type: 'number' },
            options: { validators: [Validators.required, Validators.min(1)] },
          }),
        ],
      }),
    ],
  };
}
