import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@matheo/datepicker';
import { DateAdapter, DateUnit } from '@matheo/datepicker/core';
import { actions, badges } from '../../constants/datepicker.links';

@Component({
  selector: 'web-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent<D = Date> implements OnInit {
  // ref links
  actions = actions;
  badges = badges;

  form!: FormGroup;

  startDate = new Date(1990, 0, 1);

  excludeFilter = (d: D | null, unit?: DateUnit): boolean => {
    const hour = this.adapter.getHours(d || this.adapter.today());
    if (unit === 'hour') {
      // prevent office hours from being selected.
      return hour >= 8 && hour <= 18;
    }

    if (unit === 'minute') {
      const minutes = this.adapter.getMinutes(d || this.adapter.today());
      // we need to limit 18:00
      return hour < 18 || minutes === 0;
    }

    const day = this.adapter.getDayOfWeek(d || this.adapter.today());
    // prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  dateClass: MatCalendarCellClassFunction<D> = (date, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const day = this.adapter.getDate(date);
      // Highlight the 1st and 20th day of each month.
      return day === 1 || day === 20 ? 'custom-date-class' : '';
    }
    if (view === 'hour') {
      const hour = this.adapter.getHours(date);
      return hour >= 18 || hour < 8 ? 'custom-date-class' : '';
    }

    if (view === 'minute') {
      const minutes = this.adapter.getMinutes(date);
      return minutes >= 0 && minutes < 30 ? 'custom-date-class' : '';
    }

    return '';
  };

  constructor(private fb: FormBuilder, private adapter: DateAdapter<D>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      month: new Date(),
      year: new Date(),
      touchUI: null,
      start: null,
      filter: null,
    });
  }
}
