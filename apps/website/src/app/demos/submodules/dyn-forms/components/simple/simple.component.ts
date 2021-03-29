import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynFormControls } from '@matheo/dyn-forms/core';
import { createConfig } from '@matheo/dyn-forms/material';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'web-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SimpleComponent implements OnInit {
  profileCard = new BehaviorSubject({
    title: 'Profile',
    subtitle: 'Please fill your Personal Information',
  });

  controls: DynFormControls = [
    createConfig('CARD', {
      name: 'profile',
      dynParams: this.profileCard,
      controls: [
        createConfig('TEXT', {
          name: 'firstName',
          dynParams: {
            label: 'First Name',
          },
          dynOptions: {
            validators: [Validators.required],
          },
        }),
        createConfig('TEXT', {
          name: 'lastName',
          dynParams: {
            label: 'Last Name',
          },
        }),
      ],
    }),
    createConfig('CARD', {
      name: 'items',
      dynParams: {
        title: 'Dynamic Items',
        subtitle: 'Dynamic implementation of a Form Array ',
      },
      controls: [
        createConfig('TEXT', {
          name: 'fullName',
          dynParams: {
            label: 'Full Name',
          },
        }),
        createConfig('TEXT', {
          name: 'id',
          dynParams: {
            type: 'number',
            label: 'ID Number',
          },
          dynOptions: {
            validators: [Validators.required],
          },
        }),
      ],
    }),
  ];
  form = this.builder.group({});

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);

    setTimeout(() => {
      this.profileCard.next({
        title: 'Profile',
        subtitle: 'Thanks for fill out your Personal Information',
      });
    }, 5000);
  }
}
