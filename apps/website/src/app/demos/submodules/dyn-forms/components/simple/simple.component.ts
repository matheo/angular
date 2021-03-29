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
    title: 'Profile',
    subtitle: 'Please fill your Personal Information',
  });

  controls: DynFormControls = [
    createConfig('CARD', {
      name: 'profile',
      dynParams: this.profileCard,
      controls: [
        createConfig('INPUT', {
          name: 'firstName',
          dynParams: {
            label: 'First Name',
          },
          dynOptions: {
            validators: [Validators.required],
          },
        }),
        createConfig('INPUT', {
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
        createConfig('INPUT', {
          name: 'fullName',
          dynParams: {
            label: 'Full Name',
          },
        }),
        createConfig('SELECT', {
          name: 'idType',
          dynParams: {
            label: 'ID Type',
            options: [
              { text: '- Choose one -', value: null },
              { text: 'ID', value: 'ID' },
              { text: 'Passport', value: 'PASSPORT' },
            ],
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
  }

  ngAfterViewInit(): void {
    const group = this.form.get('profile') as FormGroup;
    group.statusChanges.pipe(startWith(group.status)).subscribe((status) => {
      this.profileCard.next({
        title: 'Profile',
        subtitle:
          status === 'INVALID'
            ? 'Please fill your Personal Information'
            : 'Thanks for fill out your Personal Information',
      });
    });
  }
}
