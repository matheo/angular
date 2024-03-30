import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDataSource } from './datasource';
import { missingDataSourceInput } from './messages';

@Component({
  selector: 'mat-datasource-overlay',
  templateUrl: './overlay.html',
  host: {
    class: 'mat-datasource-overlay',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSourceOverlay<REQ, RAW, RES>
  implements AfterContentInit, OnDestroy
{
  @Input({ required: true }) dataSource!: MatDataSource<REQ, RAW, RES>;

  @Input() diameter?: number;
  @Input() strokeWidth?: number;

  @HostBinding('style.display')
  _display?: string;

  private onDestroy = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this._validateSource();

    // listen source changes
    this.dataSource.change$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this._display =
        this.dataSource.isLoading ||
        this.dataSource.hasErrors ||
        this.dataSource.isEmpty
          ? 'flex'
          : 'none';

      this.cdr.markForCheck();
    });
  }

  private _validateSource() {
    if (!this.dataSource) {
      throw Error(missingDataSourceInput());
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
