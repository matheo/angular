import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { simpleForm } from './simple.form';

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

  controls = simpleForm(this.profileCard);
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
