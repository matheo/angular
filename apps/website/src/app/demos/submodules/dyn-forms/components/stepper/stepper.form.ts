import { Validators } from '@angular/forms';
import { DynControlConfig } from '@myndpm/dyn-forms/core';
import { createConfig } from '@myndpm/dyn-forms/material';

export function stepperForm(): DynControlConfig {
  return createConfig('CARD', {
    name: 'data',
    controls: [
      createConfig('INPUT', {
        name: 'firstName',
        params: { label: 'First Name *' },
        options: { validators: [Validators.required] },
      }),
      createConfig('INPUT', {
        name: 'lastName',
        params: { label: 'Last Name *' },
        options: { validators: [Validators.required] },
      }),
      createConfig('INPUT', {
        name: 'friendCode',
        params: { label: 'Friend Code' },
      }),
      createConfig('INPUT', {
        name: 'streetNumber',
        params: { label: 'Street Number *' },
        options: { validators: [Validators.required] },
      }),
      createConfig('INPUT', {
        name: 'islandName',
        params: { label: 'Island Name *' },
        options: { validators: [Validators.required] },
      }),
      createConfig('INPUT', {
        name: 'initialDeposit',
        params: { label: 'Initial Deposit *' },
        options: { validators: [Validators.required, Validators.min(0)] },
      }),
      createConfig('INPUT', {
        name: 'loanType',
        params: { label: 'Loan Type *' },
        options: { validators: [Validators.required] },
      }),
      createConfig('INPUT', {
        name: 'roofColor',
        params: { label: 'Roof Color *' },
        options: { validators: [Validators.required] },
      }),
    ],
  });
}
