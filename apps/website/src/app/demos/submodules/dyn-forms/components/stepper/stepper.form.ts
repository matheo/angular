import { DynControlConfig } from '@myndpm/dyn-forms/core';
import { createMatConfig } from '@myndpm/dyn-forms/ui-material';

export function stepperForm(): DynControlConfig {
  return createMatConfig('CARD', {
    name: 'data',
    controls: [
      createMatConfig('INPUT', {
        name: 'firstName',
        validators: ['required'],
        params: { label: 'First Name *' },
      }),
      createMatConfig('INPUT', {
        name: 'lastName',
        validators: ['required'],
        params: { label: 'Last Name *' },
      }),
      createMatConfig('INPUT', {
        name: 'friendCode',
        params: { label: 'Friend Code' },
      }),
      createMatConfig('INPUT', {
        name: 'streetNumber',
        validators: ['required'],
        params: { label: 'Street Number *' },
      }),
      createMatConfig('INPUT', {
        name: 'islandName',
        validators: ['required'],
        params: { label: 'Island Name *' },
      }),
      createMatConfig('INPUT', {
        name: 'initialDeposit',
        validators: ['required', ['min', 0]],
        params: { label: 'Initial Deposit *' },
      }),
      createMatConfig('INPUT', {
        name: 'loanType',
        validators: ['required'],
        params: { label: 'Loan Type *' },
      }),
      createMatConfig('INPUT', {
        name: 'roofColor',
        validators: ['required'],
        params: { label: 'Roof Color *' },
      }),
    ],
  });
}
