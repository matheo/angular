import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateUnit } from '@matheo/datepicker';

@Component({
  selector: 'web-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit {
  form!: FormGroup;

  startDate = new Date(1990, 0, 1);
  excludeFilter = (d: Date | null, unit?: DateUnit): boolean => {
    const hour = (d || new Date()).getHours();
    if (unit === 'hour') {
      // prevent office hours from being selected.
      return hour >= 8 && hour <= 18;
    }

    if (unit === 'minute') {
      const minutes = (d || new Date()).getMinutes();
      // we need to limit 18:00
      return hour < 18 || minutes === 0;
    }

    const day = (d || new Date()).getDay();
    // prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      month: new Date(),
      year: new Date(),
      touchUI: new Date(),
      start: new Date(),
      filter: new Date(),
    });
  }
}
