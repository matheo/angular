import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@matheo/datepicker/core';
import { AstroTime, MoonPhase, SearchMoonPhase } from 'astronomy-engine';
import { differenceInHours } from 'date-fns';
import { startWith } from 'rxjs/operators';
import { moonPhases, SYNODIC_MONTH } from './sunmoon.constants';
import { BirthMoonArgs, BirthMoonRow } from './sunmoon.interfaces';

@Component({
  selector: 'web-sunmoon',
  templateUrl: './sunmoon.component.html',
  styleUrls: ['./sunmoon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SunmoonComponent implements OnInit {
  form!: FormGroup;
  columns: string[] = ['date', 'phase', 'age', 'future', 'events'];
  data: BirthMoonRow[];

  readonly moonPhases = moonPhases;

  @ViewChild('link', { static: true, read: ElementRef })
  link: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    const { birthdate, age } = this.route.snapshot.queryParams;

    this.form = this.fb.group({
      birthdate: birthdate ? new Date(birthdate) : null,
      maxAge: age || 90, // max age
    });

    this.form.valueChanges
      .pipe(startWith(this.form.value))
      .subscribe((args) => this.updateTable(args));
  }

  updateTable({ birthdate, maxAge }: BirthMoonArgs): void {
    this.data = [];

    if (birthdate) {
      const TOLERANCE = 2;
      const birthPhase = MoonPhase(birthdate);
      const approxDays = Math.round((birthPhase * SYNODIC_MONTH) / 360);
      let approxDate = this.dateAdapter.addCalendarDays(
        birthdate,
        (approxDays + TOLERANCE) * -1
      );
      let longitude = 0;
      let result: AstroTime;
      let diff: number;
      let born = false;

      do {
        result = SearchMoonPhase(longitude % 360, approxDate, 5);
        diff = result ? differenceInHours(result.date, birthdate) / 24 : 0;

        if (!born && result.date > birthdate) {
          this.data.push({
            date: birthdate,
            moonLon: null,
            age: null,
            events: 'Nacimiento',
          });
          born = true;
        }

        this.data.push({
          date: result?.date,
          moonLon: longitude % 360,
          age: diff,
          future: result
            ? this.dateAdapter.addCalendarYears(result.date, diff)
            : null,
        });

        approxDate = result?.date;
        longitude += 45;
      } while (result && diff < maxAge);
    }

    this.cdr.detectChanges();
  }

  formatAge(age: number): string {
    const abs = Math.abs(age);
    const decimal = abs - Math.floor(abs);
    return `${Math.trunc(age)}a ${(decimal * 12).toFixed(0)}m`;
  }

  getLink(): string {
    return this.link.nativeElement.href;
  }
}
