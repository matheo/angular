import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDataSource } from './datasource';
import { mapPaginator, mapSort } from './mappers';
import { nonNumeric, setValue } from './messages';
import { DataSourceItem } from './types';

export abstract class ReactiveDataSource<REQ, RAW, RES> extends MatDataSource<
  REQ,
  RAW,
  RES
> {
  /**
   * Pagination Settings
   */
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(size: number) {
    this._logger.check(isNaN(Number(size)), nonNumeric('pageIndex'));
    this._logger.print(setValue('PageIndex'), Number(size));
    this._pageIndex = Number(size);
  }
  private _pageIndex = 0;

  get pageSize() {
    return this._pageSize;
  }
  set pageSize(size: number) {
    if (size) {
      this._logger.check(isNaN(Number(size)), nonNumeric('pageSize'));
      this._logger.print(setValue('PageSize'), Number(size));
      this._pageSize = Number(size);
    }
  }
  private _pageSize = 10;

  // be sure the paginator's view has been initialized
  setPaginator(
    paginator: MatPaginator,
    mapper?: (
      pageSize: number
    ) => UnaryFunction<Observable<PageEvent>, Observable<any>>
  ) {
    this.addStream({
      name: 'MatPaginator',
      stream: paginator.page.pipe<any>(
        mapper ? mapper(this.pageSize) : mapPaginator(this.pageSize)
      ),
    });
  }

  // sort changes emitted will trigger an update
  setSort(
    sort: MatSort,
    mapper?: () => UnaryFunction<Observable<Sort>, Observable<any>>
  ) {
    this.addStream({
      name: 'MatSort',
      stream: sort.sortChange.pipe<any>(mapper ? mapper() : mapSort()),
    });
  }

  /**
   * Attachs an autocompleter with this data source filtered. Note that
   * the stream provided will be accessed during change detection and should not directly change
   * values that are bound in template views.
   * @returns Observable that emits a new value when the data changes.
   */
  attach(): Observable<Array<DataSourceItem>> {
    return this.connect().pipe(map((res) => this.resFilter(res)));
  }

  // customized filter trigger
  abstract filter(query: string, limit: number): void;

  // customized result mapper
  abstract resFilter(result: Array<RES>): Array<DataSourceItem>;
}
