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
      params: this.profileCard,
      controls: [
        createConfig('INPUT', {
          name: 'firstName',
          params: {
            label: 'First Name',
          },
          options: {
            validators: [Validators.required],
          },
        }),
        createConfig('INPUT', {
          name: 'lastName',
          params: {
            label: 'Last Name',
          },
        }),
      ],
    }),
    createConfig('ARRAY', {
      name: 'items',
      params: {
        title: 'Persons',
        subtitle: 'Dynamic implementation of a Form Array ',
      },
      controls: [
        createConfig('INPUT', {
          name: 'fullName',
          params: {
            label: 'Full Name',
          },
        }),
        createConfig('SELECT', {
          name: 'idType',
          params: {
            label: 'ID Type',
            options: [
              { text: '- Choose one -', value: null },
              { text: 'ID', value: 'ID' },
              { text: 'Passport', value: 'PASSPORT' },
            ],
          },
          options: {
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
