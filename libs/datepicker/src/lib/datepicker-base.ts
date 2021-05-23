/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directionality} from '@angular/cdk/bidi';
import {BooleanInput, coerceBooleanProperty, coerceStringArray} from '@angular/cdk/coercion';
import {ESCAPE, hasModifierKey, UP_ARROW} from '@angular/cdk/keycodes';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import {ComponentPortal, ComponentType, TemplatePortal} from '@angular/cdk/portal';
import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  Directive,
  OnChanges,
  OnInit,
  SimpleChanges,
  isDevMode,
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  mixinColor,
  ThemePalette,
} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {merge, Subject, Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {DateAdapter} from '@matheo/datepicker/core';
import {MatCalendar} from './calendar';
import {MatCalendarType, MatCalendarView} from './calendar.types';
import {matDatepickerAnimations} from './datepicker-animations';
import {createMissingDateImplError} from './datepicker-errors';
import {MatCalendarUserEvent, MatCalendarCellClassFunction} from './calendar-body';
import {DateFilterFn} from './datepicker-input-base';
import {
  ExtractDateTypeFromSelection,
  MatDateSelectionModel,
  DateRange,
} from './date-selection-model';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy,
} from './date-range-selection-strategy';
import {MatDatepickerIntl} from './datepicker-intl';

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;

/** Injection token that determines the scroll handling while the calendar is open. */
export const MAT_DATEPICKER_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('mat-datepicker-scroll-strategy');

/** @docs-private */
export function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** Possible positions for the datepicker dropdown along the X axis. */
export type DatepickerDropdownPositionX = 'start' | 'end';

/** Possible positions for the datepicker dropdown along the Y axis. */
export type DatepickerDropdownPositionY = 'above' | 'below';

/** @docs-private */
export const MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_DATEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY,
};

// Boilerplate for applying mixins to MatDatepickerContent.
/** @docs-private */
class MatDatepickerContentBase {
  constructor(public _elementRef: ElementRef) { }
}
const _MatDatepickerContentMixinBase: CanColorCtor & typeof MatDatepickerContentBase =
    mixinColor(MatDatepickerContentBase);

/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
@Component({
  selector: 'mat-datepicker-content',
  templateUrl: 'datepicker-content.html',
  styleUrls: ['datepicker-content.scss'],
  host: {
    'class': 'mat-datepicker-content',
    '[@transformPanel]': '_animationState',
    '(@transformPanel.done)': '_animationDone.next()',
    '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
  },
  animations: [
    matDatepickerAnimations.transformPanel,
    matDatepickerAnimations.fadeInCalendar,
  ],
  exportAs: 'matDatepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color'],
})
export class MatDatepickerContent<S, D = ExtractDateTypeFromSelection<S>>
  extends _MatDatepickerContentMixinBase implements OnInit, AfterViewInit, OnDestroy, CanColor {
  private _subscriptions = new Subscription();
  private _model: MatDateSelectionModel<S, D>;

  /** Reference to the internal calendar component. */
  @ViewChild(MatCalendar) _calendar: MatCalendar<D>;

  /** Reference to the datepicker that created the overlay. */
  datepicker: MatDatepickerBase<any, S, D>;

  /** Start of the comparison range. */
  comparisonStart: D | null;

  /** End of the comparison range. */
  comparisonEnd: D | null;

  /** Whether the datepicker is above or below the input. */
  _isAbove: boolean;

  /** Current state of the animation. */
  _animationState: 'enter' | 'void' = 'enter';

  /** Emits when an animation has finished. */
  _animationDone = new Subject<void>();

  /** Text for the close button. */
  _closeButtonText: string;

  /** Whether the close button currently has focus. */
  _closeButtonFocused: boolean;

  /** Portal with projected action buttons. */
  _actionsPortal: TemplatePortal | null = null;

  constructor(
    elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _globalModel: MatDateSelectionModel<S, D>,
    private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
        private _rangeSelectionStrategy: MatDateRangeSelectionStrategy<D>,
    /**
     * @deprecated `intl` argument to become required.
     * @breaking-change 12.0.0
     */
    intl?: MatDatepickerIntl) {
    super(elementRef);
    // @breaking-change 12.0.0 Remove fallback for `intl`.
    this._closeButtonText = intl?.closeCalendarLabel || 'Close calendar';
  }

  ngOnInit() {
    // If we have actions, clone the model so that we have the ability to cancel the selection,
    // otherwise update the global model directly. Note that we want to assign this as soon as
    // possible, but `_actionsPortal` isn't available in the constructor so we do it in `ngOnInit`.
    this._model = this._actionsPortal ? this._globalModel.clone() : this._globalModel;
  }

  ngAfterViewInit() {
    this._subscriptions.add(this.datepicker.stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    }));
    this._calendar.focusActiveCell();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this._animationDone.complete();
  }

  _queueUserSelection(date: D) {
    this._model.queue(date);
  }

  _handleUserSelection(event: MatCalendarUserEvent<D | null>) {
    const selection = this._model.selection;
    const value = event.value;
    const isRange = selection instanceof DateRange;

    // If we're selecting a range and we have a selection strategy, always pass the value through
    // there. Otherwise don't assign null values to the model, unless we're selecting a range.
    // A null value when picking a range means that the user cancelled the selection (e.g. by
    // pressing escape), whereas when selecting a single value it means that the value didn't
    // change. This isn't very intuitive, but it's here for backwards-compatibility.
    if (isRange && this._rangeSelectionStrategy) {
      const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
          selection as unknown as DateRange<D>, event.event);
      this._model.updateSelection(newSelection as unknown as S, this);
    } else if (value && (isRange || !this._dateAdapter.sameDate(
        value, selection as unknown as D, this._calendar.getUnit()))) {
      this._model.add(value);
    }

    // Delegate closing the popup to the actions.
    if ((!this._model || this._model.isComplete()) && !this._actionsPortal) {
      this.datepicker.close();
    }
  }

  _startExitAnimation() {
    this._animationState = 'void';
    this._changeDetectorRef.markForCheck();
  }

  _getSelected() {
    return this._model.selection as unknown as D | DateRange<D> | null;
  }

  /** Applies the current pending selection to the global model. */
  _applyPendingSelection() {
    this._model.processQueue();
    if (this._model !== this._globalModel) {
      this._globalModel.updateSelection(this._model.selection, this);
    }
  }
}

/** Form control that can be associated with a datepicker. */
export interface MatDatepickerControl<D> {
  type: MatCalendarType;
  getStartValue(): D | null;
  getThemePalette(): ThemePalette;
  min: D | null;
  max: D | null;
  disabled: boolean;
  dateFilter: DateFilterFn<D>;
  getConnectedOverlayOrigin(): ElementRef;
  stateChanges: Observable<void>;
}

/** A datepicker that can be attached to a {@link MatDatepickerControl}. */
export interface MatDatepickerPanel<C extends MatDatepickerControl<D>, S,
    D = ExtractDateTypeFromSelection<S>> {
  /** Stream that emits whenever the date picker is closed. */
  closedStream: EventEmitter<void>;
  /** The type of value handled by the calendar. */
  type: MatCalendarType;
  /** Color palette to use on the datepicker's calendar. */
  color: ThemePalette;
  /** The input element the datepicker is associated with. */
  datepickerInput: C;
  /** Whether the datepicker pop-up should be disabled. */
  disabled: boolean;
  /** The id for the datepicker's calendar. */
  id: string;
  /** Whether the datepicker is open. */
  opened: boolean;
  /** Stream that emits whenever the date picker is opened. */
  openedStream: EventEmitter<void>;
  /** Emits when the datepicker's state changes. */
  stateChanges: Subject<void>;
  /** Opens the datepicker. */
  open(): void;
  /** Register an input with the datepicker. */
  registerInput(input: C): MatDateSelectionModel<S, D>;
}

/** Base class for a datepicker. */
@Directive()
export abstract class MatDatepickerBase<C extends MatDatepickerControl<D>, S,
  D = ExtractDateTypeFromSelection<S>> implements MatDatepickerPanel<C, S, D>, OnDestroy,
    OnChanges {
  private _scrollStrategy: () => ScrollStrategy;
  private _inputStateChanges = Subscription.EMPTY;

  /** An input indicating the type of the custom header component for the calendar, if set. */
  @Input() calendarHeaderComponent: ComponentType<any>;

  /** The date to open the calendar to initially. */
  @Input()
  get startAt(): D | null {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this.datepickerInput ? this.datepickerInput.getStartValue() : null);
  }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** The type of value handled by the calendar. */
  @Input() type: MatCalendarType = 'date';

  /** The view that the calendar should start in. */
  @Input() startView: MatCalendarView = 'month';

  /** multi-year inputs */
  @Input() yearsPerPage = 24;

  @Input() yearsPerRow = 4;

  /** Clock interval */
  @Input() clockStep = 1;

  /** Clock hour format */
  @Input() twelveHour = true;

  /** Color palette to use on the datepicker's calendar. */
  @Input()
  get color(): ThemePalette {
    return this._color ||
        (this.datepickerInput ? this.datepickerInput.getThemePalette() : undefined);
  }
  set color(value: ThemePalette) {
    this._color = value;
  }
  _color: ThemePalette;

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input()
  get touchUi(): boolean { return this._touchUi; }
  set touchUi(value: boolean) {
    this._touchUi = coerceBooleanProperty(value);
  }
  private _touchUi = false;

  /** Whether the datepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this.datepickerInput ?
        this.datepickerInput.disabled : !!this._disabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.stateChanges.next(undefined);
    }
  }
  private _disabled: boolean;

  /** Preferred position of the datepicker in the X axis. */
  @Input()
  xPosition: DatepickerDropdownPositionX = 'start';

  /** Preferred position of the datepicker in the Y axis. */
  @Input()
  yPosition: DatepickerDropdownPositionY = 'below';

  /**
   * Whether to restore focus to the previously-focused element when the calendar is closed.
   * Note that automatic focus restoration is an accessibility feature and it is recommended that
   * you provide your own equivalent, if you decide to turn it off.
   */
  @Input()
  get restoreFocus(): boolean { return this._restoreFocus; }
  set restoreFocus(value: boolean) {
    this._restoreFocus = coerceBooleanProperty(value);
  }
  private _restoreFocus = true;

  /**
   * Emits selected year in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits selected month in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits when the current view changes.
   */
  @Output() readonly viewChanged: EventEmitter<MatCalendarView> =
    new EventEmitter<MatCalendarView>(true);

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: MatCalendarCellClassFunction<D>;

  /** Emits when the datepicker has been opened. */
  @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>();

  /** Emits when the datepicker has been closed. */
  @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Classes to be passed to the date picker panel.
   * Supports string and string array values, similar to `ngClass`.
   */
  @Input()
  get panelClass(): string | string[] { return this._panelClass; }
  set panelClass(value: string | string[]) {
    this._panelClass = coerceStringArray(value);
  }
  private _panelClass: string[];

  /** Whether the calendar is open. */
  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) {
    coerceBooleanProperty(value) ? this.open() : this.close();
  }
  private _opened = false;

  /** The id for the datepicker calendar. */
  id: string = `mat-datepicker-${datepickerUid++}`;

  /** The minimum selectable date. */
  _getMinDate(): D | null {
    return this.datepickerInput?.min;
  }

  /** The maximum selectable date. */
  _getMaxDate(): D | null {
    return this.datepickerInput?.max;
  }

  _getDateFilter(): DateFilterFn<D> {
    return this.datepickerInput?.dateFilter;
  }

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef: OverlayRef | null;

  /** A reference to the dialog when the calendar is opened as a dialog. */
  private _dialogRef: MatDialogRef<MatDatepickerContent<S, D>> | null;

  /** Reference to the component instantiated in popup mode. */
  private _popupComponentRef: ComponentRef<MatDatepickerContent<S, D>> | null;

  /** The element that was focused before the datepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null;

  /** Unique class that will be added to the backdrop so that the test harnesses can look it up. */
  private _backdropHarnessClass = `${this.id}-backdrop`;

  /** Currently-registered actions portal. */
  private _actionsPortal: TemplatePortal | null;

  /** The input element this datepicker is associated with. */
  datepickerInput: C;

  /** Emits when the datepicker's state changes. */
  readonly stateChanges = new Subject<void>();

  constructor(private _dialog: MatDialog,
              private _overlay: Overlay,
              private _ngZone: NgZone,
              private _viewContainerRef: ViewContainerRef,
              @Inject(MAT_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
              @Optional() private _dateAdapter: DateAdapter<D>,
              @Optional() private _dir: Directionality,
              @Optional() @Inject(DOCUMENT) private _document: any,
              private _model: MatDateSelectionModel<S, D>) {
    if (!this._dateAdapter && isDevMode()) {
      throw createMissingDateImplError('DateAdapter');
    }

    this._scrollStrategy = scrollStrategy;
  }

  ngOnChanges(changes: SimpleChanges) {
    const positionChange = changes['xPosition'] || changes['yPosition'];

    if (positionChange && !positionChange.firstChange && this._popupRef) {
      this._setConnectedPositions(
          this._popupRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy);

      if (this.opened) {
        this._popupRef.updatePosition();
      }
    }

    if (this.datepickerInput.type !== this.type) {
      this.datepickerInput.type = this.type;
    }

    this.stateChanges.next(undefined);
  }

  ngOnDestroy() {
    this._destroyPopup();
    this.close();
    this._inputStateChanges.unsubscribe();
    this.stateChanges.complete();
  }

  /** Selects the given date */
  select(date: D): void {
    this._model.add(date);
  }

  /** Emits the selected year in multiyear view */
  _selectYear(normalizedYear: D): void {
    this.yearSelected.emit(normalizedYear);
  }

  /** Emits selected month in year view */
  _selectMonth(normalizedMonth: D): void {
    this.monthSelected.emit(normalizedMonth);
  }

  /** Emits changed view */
  _viewChanged(view: MatCalendarView): void {
    this.viewChanged.emit(view);
  }

  _queueDate(date: D): void {
    this._model.queue(date);
  }

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   * @returns Selection model that the input should hook itself up to.
   */
  registerInput(input: C): MatDateSelectionModel<S, D> {
    if (this.datepickerInput && (isDevMode())) {
      throw Error('A MatDatepicker can only be associated with a single input.');
    }
    this._inputStateChanges.unsubscribe();
    this.datepickerInput = input;
    this.datepickerInput.type = this.type;
    this._inputStateChanges =
        input.stateChanges.subscribe(() => this.stateChanges.next(undefined));
    return this._model;
  }

  /**
   * Registers a portal containing action buttons with the datepicker.
   * @param portal Portal to be registered.
   */
  registerActions(portal: TemplatePortal): void {
    if (this._actionsPortal && (isDevMode())) {
      throw Error('A MatDatepicker can only be associated with a single actions row.');
    }
    this._actionsPortal = portal;
  }

  /**
   * Removes a portal containing action buttons from the datepicker.
   * @param portal Portal to be removed.
   */
  removeActions(portal: TemplatePortal): void {
    if (portal === this._actionsPortal) {
      this._actionsPortal = null;
    }
  }

  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return;
    }
    if (!this.datepickerInput && (isDevMode())) {
      throw Error('Attempted to open an MatDatepicker with no associated input.');
    }
    if (this._document) {
      this._focusedElementBeforeOpen = this._document.activeElement;
    }

    this.touchUi ? this._openAsDialog() : this._openAsPopup();
    this._opened = true;
    this.openedStream.emit();
  }

  /** Close the calendar. */
  close(): void {
    if (!this._opened) {
      return;
    }
    if (this._popupComponentRef && this._popupRef) {
      const instance = this._popupComponentRef.instance;
      instance._startExitAnimation();
      instance._animationDone.pipe(take(1)).subscribe(() => this._destroyPopup());
    }
    if (this._dialogRef) {
      this._dialogRef.close();
      this._dialogRef = null;
    }

    const completeClose = () => {
      // The `_opened` could've been reset already if
      // we got two events in quick succession.
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
        this._focusedElementBeforeOpen = null;
      }
    };

    if (this._restoreFocus && this._focusedElementBeforeOpen &&
      typeof this._focusedElementBeforeOpen.focus === 'function') {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datepicker as closed, async as well.
      this._focusedElementBeforeOpen.focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }

  /** Applies the current pending selection on the popup to the model. */
  _applyPendingSelection() {
    const instance = this._popupComponentRef?.instance || this._dialogRef?.componentInstance;
    instance?._applyPendingSelection();
  }

  /** Open the calendar as a dialog. */
  private _openAsDialog(): void {
    // Usually this would be handled by `open` which ensures that we can only have one overlay
    // open at a time, however since we reset the variables in async handlers some overlays
    // may slip through if the user opens and closes multiple times in quick succession (e.g.
    // by holding down the enter key).
    if (this._dialogRef) {
      this._dialogRef.close();
    }

    this._dialogRef = this._dialog.open<MatDatepickerContent<S, D>>(MatDatepickerContent, {
      direction: this._dir ? this._dir.value : 'ltr',
      viewContainerRef: this._viewContainerRef,
      panelClass: 'mat-datepicker-dialog',

      // These values are all the same as the defaults, but we set them explicitly so that the
      // datepicker dialog behaves consistently even if the user changed the defaults.
      hasBackdrop: true,
      disableClose: false,
      backdropClass: ['cdk-overlay-dark-backdrop', this._backdropHarnessClass],
      width: '',
      height: '',
      minWidth: '',
      minHeight: '',
      maxWidth: '80vw',
      maxHeight: '',
      position: {},

      // Disable the dialog's automatic focus capturing, because it'll go to the close button
      // automatically. The calendar will move focus on its own once it renders.
      autoFocus: false,

      // `MatDialog` has focus restoration built in, however we want to disable it since the
      // datepicker also has focus restoration for dropdown mode. We want to do this, in order
      // to ensure that the timing is consistent between dropdown and dialog modes since `MatDialog`
      // restores focus when the animation is finished, but the datepicker does it immediately.
      // Furthermore, this avoids any conflicts where the datepicker consumer might move focus
      // inside the `closed` event which is dispatched immediately.
      restoreFocus: false
    });

    this._dialogRef.afterClosed().subscribe(() => this.close());
    this._forwardContentValues(this._dialogRef.componentInstance);
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    const portal = new ComponentPortal<MatDatepickerContent<S, D>>(MatDatepickerContent,
                                                                   this._viewContainerRef);

    this._destroyPopup();
    this._createPopup();
    this._popupComponentRef = this._popupRef!.attach(portal);
    this._forwardContentValues(this._popupComponentRef.instance);

    // Update the position once the calendar has rendered.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this._popupRef!.updatePosition();
    });
  }

  /** Forwards relevant values from the datepicker to the datepicker content inside the overlay. */
  protected _forwardContentValues(instance: MatDatepickerContent<S, D>) {
    instance.datepicker = this;
    instance.color = this.color;
    instance._actionsPortal = this._actionsPortal;
  }

  /** Create the popup. */
  private _createPopup(): void {
    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(this.datepickerInput.getConnectedOverlayOrigin())
      .withTransformOriginOn('.mat-datepicker-content')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition();

    const overlayConfig = new OverlayConfig({
      positionStrategy: this._setConnectedPositions(positionStrategy),
      hasBackdrop: true,
      backdropClass: ['mat-overlay-transparent-backdrop', this._backdropHarnessClass],
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'mat-datepicker-popup',
    });

    this._popupRef = this._overlay.create(overlayConfig);
    this._popupRef.overlayElement.setAttribute('role', 'dialog');

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.detachments(),
      this._popupRef.keydownEvents().pipe(filter(event => {
        // Closing on alt + up is only valid when there's an input associated with the datepicker.
        return (event.keyCode === ESCAPE && !hasModifierKey(event)) || (this.datepickerInput &&
            hasModifierKey(event, 'altKey') && event.keyCode === UP_ARROW);
      }))
    ).subscribe(event => {
      if (event) {
        event.preventDefault();
      }

      this.close();
    });
  }

  /** Destroys the current popup overlay. */
  private _destroyPopup() {
    if (this._popupRef) {
      this._popupRef.dispose();
      this._popupRef = this._popupComponentRef = null;
    }
  }

  /** Sets the positions of the datepicker in dropdown mode based on the current configuration. */
  private _setConnectedPositions(strategy: FlexibleConnectedPositionStrategy) {
    const primaryX = this.xPosition === 'end' ? 'end' : 'start';
    const secondaryX = primaryX === 'start' ? 'end' : 'start';
    const primaryY = this.yPosition === 'above' ? 'bottom' : 'top';
    const secondaryY = primaryY === 'top' ? 'bottom' : 'top';

    return strategy.withPositions([
      {
        originX: primaryX,
        originY: secondaryY,
        overlayX: primaryX,
        overlayY: primaryY
      },
      {
        originX: primaryX,
        originY: primaryY,
        overlayX: primaryX,
        overlayY: secondaryY
      },
      {
        originX: secondaryX,
        originY: secondaryY,
        overlayX: secondaryX,
        overlayY: primaryY
      },
      {
        originX: secondaryX,
        originY: primaryY,
        overlayX: secondaryX,
        overlayY: secondaryY
      }
    ]);
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_touchUi: BooleanInput;
  static ngAcceptInputType_restoreFocus: BooleanInput;
}
