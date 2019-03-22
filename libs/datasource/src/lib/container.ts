import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { MatDataSource } from './datasource';
import { missingDataSourceInput } from './messages';

@Component({
  selector: 'mat-datasource',
  templateUrl: './container.html',
  styleUrls: ['./container.scss', './directives.scss', './overlay.scss'],
  host: {
    class: 'mat-datasource'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSourceContainer<REQ, RAW, RES> implements AfterContentInit {
  @Input() dataSource: MatDataSource<REQ, RAW, RES>;

  @Input() diameter = 40;
  @Input() strokeWidth = 5;

  constructor() {}

  ngAfterContentInit() {
    this._validateSource();
  }

  private _validateSource() {
    if (!this.dataSource) {
      throw Error(missingDataSourceInput());
    }
  }
}
