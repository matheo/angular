import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/**
 * Premade Getters
 */

export function getterPaginator(paginator: MatPaginator) {
  return (pageSize: number) => {
    // : DataSourceGetter<T>
    return () => ({
      pageIndex: paginator ? paginator.pageIndex : 0,
      pageSize: paginator ? paginator.pageSize : pageSize
    });
  };
}

export function getterSort(sorter: MatSort) {
  // DataSourceGetter<T>
  return () => {
    return sorter && sorter.active
      ? {
          orderBy: sorter.active,
          orderDir: sorter.direction || undefined
        }
      : {};
  };
}
