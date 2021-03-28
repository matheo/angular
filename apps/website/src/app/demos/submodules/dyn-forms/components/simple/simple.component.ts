import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynFormControls } from '@matheo/dyn-forms/core';
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
    {
      dynControl: 'CARD',
      dynParams: this.profileCard,
      name: 'profile',
      controls: [
        {
          name: 'name',
          dynControl: 'TEXT',
        },
      ],
    },
    {
      dynControl: 'CARD',
      dynParams: {
        title: 'Dynamic Items',
        subtitle: 'Dynamic implementation of a Form Array ',
      },
      name: 'items',
      controls: [
        {
          name: 'name',
          dynControl: 'TEXT',
        },
      ],
    },
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
