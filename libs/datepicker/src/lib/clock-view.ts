import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '../core/datetime';
import {MatCalendarUserEvent} from './calendar-body';
import {createMissingDateImplError} from './datepicker-errors';

export const CLOCK_RADIUS = 50;
export const CLOCK_INNER_RADIUS = 27.5;
export const CLOCK_OUTER_RADIUS = 41.25;
export const CLOCK_TICK_RADIUS = 7.0833;

export type ClockView = 'hour' | 'minute';

/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  selector: 'mat-clock-view',
  templateUrl: 'clock-view.html',
  exportAs: 'matClockView',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'clock',
    '(mousedown)': '_handleMousedown($event)'
  },
  preserveWhitespaces: false
})
export class MatClockView<D> implements AfterViewInit, AfterContentInit {
  /**
   * The time to display in this clock view. (the rest is ignored)
   */
  @Input()
  get activeDate(): D {
    return this._activeDate;
  }
  set activeDate(value: D) {
    const oldActiveDate = this._activeDate;
    const validDate =
      this._getValidDateOrNull(this._dateAdapter.deserialize(value)) ||
      this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(
      validDate,
      this.minDate,
      this.maxDate
    );

    if (
      oldActiveDate &&
      this._dateAdapter.compareDate(oldActiveDate, this._activeDate)
    ) {
      this._init();
    }
  }
  private _activeDate: D;

  // The currently selected date.
  @Input()
  get selected(): D | null {
    return this._selected;
  }
  set selected(value: D | null) {
    this._selected = this._getValidDateOrNull(
      this._dateAdapter.deserialize(value)
    );
  }
  private _selected: D | null;

  /** The minimum selectable date. */
  @Input()
  get minDate(): D | null {
    return this._minDate;
  }
  set minDate(value: D | null) {
    this._minDate = this._getValidDateOrNull(
      this._dateAdapter.deserialize(value)
    );
  }
  private _minDate: D | null;

  /** The maximum selectable date. */
  @Input()
  get maxDate(): D | null {
    return this._maxDate;
  }
  set maxDate(value: D | null) {
    this._maxDate = this._getValidDateOrNull(
      this._dateAdapter.deserialize(value)
    );
  }
  private _maxDate: D | null;

  // A function used to filter which dates are selectable.
  @Input() dateFilter: (date: D, unit?: string) => boolean;

  @Input() clockStep = 1;

  @Input() twelveHour = false;

  /** Emits when a new date is selected. */
  @Output()
  readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /** Emits when any date is selected. */
  @Output() readonly _userSelection = new EventEmitter<MatCalendarUserEvent<D | null>>();

  // Hours and Minutes representing the clock view.
  _hours: any[] = [];
  _minutes: any[] = [];

  _selectedHour: number | null;
  _selectedMinute: number | null;
  _anteMeridian: boolean;
  _hourView = true;
  _size: number;

  private mouseMoveListener: any;
  private mouseUpListener: any;

  get _hand(): any {
    this._selectedHour = this._dateAdapter.getHours(this.activeDate);
    this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
    let radius = CLOCK_OUTER_RADIUS;
    let deg = 0;

    if (this.twelveHour) {
      this._selectedHour = this._selectedHour < 12 ? this._selectedHour : this._selectedHour - 12;
      this._selectedHour = this._selectedHour === 0 ? 12 : this._selectedHour;
    }

    if (this._hourView) {
      const outer = this._selectedHour > 0 && this._selectedHour < 13;
      radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
      if (this.twelveHour) {
        radius = CLOCK_OUTER_RADIUS;
      }
      deg = Math.round(this._selectedHour * (360 / (24 / 2)));
    } else {
      deg = Math.round(this._selectedMinute * (360 / 60));
    }

    return {
      transform: `rotate(${deg}deg)`,
      height: `${radius}%`,
      'margin-top': `${50 - radius}%`
    };
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _element: ElementRef,
    @Optional() public _dateAdapter: DateAdapter<D>,
    @Optional()
    @Inject(MAT_DATE_FORMATS)
    private _dateFormats: MatDateFormats
  ) {
    if (!this._dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }
    if (!this._dateFormats) {
      throw createMissingDateImplError('MAT_DATE_FORMATS');
    }

    this.mouseMoveListener = (event: any) => {
      this._handleMousemove(event);
    };
    this.mouseUpListener = () => {
      this._handleMouseup();
    };
  }

  ngAfterViewInit() {
    const { offsetWidth, offsetHeight } = this._element.nativeElement;
    this._size = (offsetWidth < offsetHeight ? offsetWidth : offsetHeight) * 0.96;
    this._changeDetectorRef.detectChanges();
  }

  ngAfterContentInit() {
    this._init();
  }

  _selectValue(event: MouseEvent, value: number) {
    event.stopPropagation();
    this.setTime(event, value);
  }

  // Handles mousedown events on the clock body.
  _handleMousedown(event: any) {
    this.setTime(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('touchmove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    document.addEventListener('touchend', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this.setTime(event);
  }

  _handleMouseup() {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('touchmove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('touchend', this.mouseUpListener);
  }

  // Initializes this clock view.
  _init() {
    this._hours.length = 0;
    this._minutes.length = 0;

    const hourNames = this._dateAdapter.getHourNames();
    const minuteNames = this._dateAdapter.getMinuteNames();

    if (this.twelveHour) {
      this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;

      for (let i = 0; i < hourNames.length / 2; i++) {
        const radian = (i / 6) * Math.PI;
        const radius = CLOCK_OUTER_RADIUS;
        const date = this._dateAdapter.createDate(
          this._dateAdapter.getYear(this.activeDate),
          this._dateAdapter.getMonth(this.activeDate),
          this._dateAdapter.getDate(this.activeDate),
          this._anteMeridian ? i : i + 12
        );
        this._hours.push({
          value: i,
          displayValue: i === 0 ? '12' : hourNames[i],
          enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
          top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
          left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
        });
      }
    } else {
      for (let i = 0; i < hourNames.length; i++) {
        const radian = (i / 6) * Math.PI;
        const outer = i > 0 && i < 13;
        const radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
        const date = this._dateAdapter.createDate(
          this._dateAdapter.getYear(this.activeDate),
          this._dateAdapter.getMonth(this.activeDate),
          this._dateAdapter.getDate(this.activeDate),
          i
        );
        this._hours.push({
          value: i,
          displayValue: i === 0 ? '12' : hourNames[i],
          enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
          top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
          left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
          fontSize: i > 0 && i < 13 ? '' : '80%',
        });
      }
    }

    for (let i = 0; i < minuteNames.length; i += 5) {
      const radian = (i / 30) * Math.PI;
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(this.activeDate),
        this._dateAdapter.getMonth(this.activeDate),
        this._dateAdapter.getDate(this.activeDate),
        this._dateAdapter.getHours(this.activeDate),
        i
      );
      this._minutes.push({
        value: i,
        displayValue: i === 0 ? '00' : minuteNames[i],
        enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
        top:
          CLOCK_RADIUS -
          Math.cos(radian) * CLOCK_OUTER_RADIUS -
          CLOCK_TICK_RADIUS,
        left:
          CLOCK_RADIUS +
          Math.sin(radian) * CLOCK_OUTER_RADIUS -
          CLOCK_TICK_RADIUS,
      });
    }

    this._changeDetectorRef.markForCheck();
  }

  // Set Time
  private setTime(event: any, input?: number) {
    const trigger = this._element.nativeElement;
    const triggerRect = trigger.getBoundingClientRect();
    const width = trigger.offsetWidth;
    const height = trigger.offsetHeight;
    const pageX =
      event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
    const pageY =
      event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
    const x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
    const y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
    const unit =
      Math.PI /
      (this._hourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
    const z = Math.sqrt(x * x + y * y);
    const outer =
      this._hourView &&
      z >
        (width * (CLOCK_OUTER_RADIUS / 100) +
          width * (CLOCK_INNER_RADIUS / 100)) /
          2;

    let value: number;
    if (input) {
      value = input;
    } else {
      let radian = Math.atan2(-x, y);
      if (radian < 0) {
        radian = Math.PI * 2 + radian;
      }
      value = Math.round(radian / unit);
    }

    const date = this._dateAdapter.clone(this.activeDate);

    if (this._hourView) {
      if (value === 12) {
        value = 0;
      }
      value = this.twelveHour
        ? this._anteMeridian
          ? value
          : value + 12
        : outer
        ? value === 0
          ? 12
          : value
        : value === 0
        ? 0
        : value + 12;
      this._dateAdapter.setHours(date, value);
    } else {
      if (this.clockStep) {
        value *= this.clockStep;
      }
      if (value === 60) {
        value = 0;
      }
      this._dateAdapter.setMinutes(date, value);
    }
    this._dateAdapter.setSeconds(date, 0, 0);

    // validate if the resulting value is disabled and do not take action
    if (
      this.dateFilter &&
      !this.dateFilter(date, this._hourView ? 'hour' : 'minute')
    ) {
      return;
    }

    this.activeDate = date;
    this.selectedChange.emit(this.activeDate);

    if (this._hourView) {
      // continue with minute view
      this._hourView = !this._hourView;
    } else {
      this._userSelection.emit({ value: date, event });
    }
  }

  _focusActiveCell() {}

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
}
