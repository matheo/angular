import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { map, startWith } from 'rxjs/operators';
import { pipe } from 'rxjs';

/**
 * Premade Mappers
 */

export function mapPaginator(pageSize: number) {
  return pipe(
    map((page: PageEvent) => ({
      pageIndex: page.pageIndex,
      pageSize: page.pageSize
    })),
    startWith({
      pageIndex: 0,
      pageSize
    })
  );
}

export function mapSort() {
  return pipe(
    map((sort: Sort) => ({
      orderBy: sort.active,
      orderDir: sort.direction || undefined
    })),
    startWith({})
  );
}
