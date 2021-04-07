import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { simpleForm } from './simple.form';

@Component({
  selector: 'web-form-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SimpleComponent implements AfterViewInit {
  // reactive parameters of the billing CARD
  profileCard = new BehaviorSubject({
    title: 'Billing Address',
    subtitle: 'Please fill the required fields',
  });

  // dyn-form inputs
  config = simpleForm(this.profileCard);
  form = new FormGroup({});

  ngAfterViewInit(): void {
    // logs each change in the console just to demo
    this.form.valueChanges.subscribe(console.log);

    // simple example of how we can trigger changes into the params
    const group = this.form.get('billing') as FormGroup;
    group.statusChanges?.pipe(startWith(group.status)).subscribe((status) => {
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
