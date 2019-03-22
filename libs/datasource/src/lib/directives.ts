import { Directive } from '@angular/core';

@Directive({
  selector: 'mat-datasource-empty',
  host: {
    class: 'mat-datasource-empty'
  }
})
export class DataSourceEmpty {}

@Directive({
  selector: 'mat-datasource-error',
  host: {
    class: 'mat-datasource-error'
  }
})
export class DataSourceError {}

@Directive({
  selector: 'mat-datasource-loading',
  host: {
    class: 'mat-datasource-loading'
  }
})
export class DataSourceLoading {}
