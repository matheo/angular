import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynFormControls } from '@matheo/dyn-forms/core';
import { createConfig } from '@matheo/dyn-forms/material';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'web-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SimpleComponent implements OnInit, AfterViewInit {
  profileCard = new BehaviorSubject({
    title: 'Billing Address',
    subtitle: 'Please fill the required fields',
  });

  controls: DynFormControls = [
    createConfig('CARD', {
      name: 'billing',
      params: this.profileCard,
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
          name: 'address1',
          params: { label: 'Address Line 1 *' },
          options: { validators: [Validators.required] },
        }),
        createConfig('INPUT', {
          name: 'address2',
          params: { label: 'Address Line 2' },
        }),
        createConfig('SELECT', {
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
        createConfig('INPUT', {
          name: 'zipCode',
          params: { label: 'Postal Code *', type: 'number' },
          options: { validators: [Validators.required, Validators.min(0)] },
        }),
      ],
    }),
    createConfig('RADIO', {
      name: 'account',
      params: {
        options: [
          { text: 'Create Account', value: 'CREATE' },
          { text: 'Checkout as a Guest', value: 'GUEST' },
        ],
      },
    }),
    createConfig('ARRAY', {
      name: 'products',
      params: {
        title: 'Products',
        subtitle: 'Items to checkout',
        initItem: true,
      },
      controls: [
        createConfig('INPUT', {
          name: 'product',
          params: { label: 'Product Name *' },
          options: { validators: [Validators.required] },
        }),
        createConfig('INPUT', {
          name: 'quantity',
          params: { label: 'Quantity *', type: 'number' },
          options: { validators: [Validators.required, Validators.min(1)] },
        }),
      ],
    }),
  ];
  form = this.builder.group({});

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  ngAfterViewInit(): void {
    const group = this.form.get('billing') as FormGroup;
    group.statusChanges.pipe(startWith(group.status)).subscribe((status) => {
      this.profileCard.next({
        title: 'Billing Address',
        subtitle:
          status === 'INVALID'
            ? 'Please fill your Personal Information'
            : 'Billing information complete',
      });
    });
  }
}
