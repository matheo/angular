import { Injectable } from '@angular/core';
import { DataSourceItem, ReactiveDataSource } from '@matheo/datasource';
import { get } from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { docsMapper } from '../operators';
import { SponsorsDatabase } from './sponsors.database';
import {
  Sponsor,
  SponsorsListItem,
  SponsorsListRequest,
} from './sponsors.types';

@Injectable()
export class SponsorsDatasource extends ReactiveDataSource<
  SponsorsListRequest,
  SponsorsListItem[],
  Sponsor
> {
  currentPage: number;
  first: SponsorsListItem;
  last: SponsorsListItem;

  constructor(protected database: SponsorsDatabase) {
    super();

    this.config = {
      debug: true,
      autoStart: true,
      emptyMsg: () => {
        if (this.args.tier) {
          return 'No sponsors on this Tier';
        }
        return 'No matching sponsors';
      },
    };
    this.pageSize = 2;
  }

  reqArguments(args: SponsorsListRequest) {
    // we cannot sortBy() with an equality filter on the same field
    if (args.orderBy === 'tier') {
      args.tier = undefined;
    }

    // somehow the paginator is not updating the pageSize initially
    if (!args.pageSize) {
      args.pageSize = this.pageSize;
    }

    if (args.pageIndex) {
      if (args.pageIndex === this.currentPage) {
        args.startAt = [this.first];
      } else if (args.pageIndex > this.currentPage) {
        args.startAfter = [this.last];
      } else {
        // inverse the order to be able to use startAt()
        args.orderDir = args.orderBy === 'desc' ? 'asc' : 'desc';
        args.startAfter = [this.first];
      }
    } else {
      this.currentPage = 0;
      this.first = null;
      this.last = null;
    }

    return args;
  }

  rawDefault() {
    return [];
  }

  rawFetch(args: SponsorsListRequest) {
    return this.database.list(args);
  }

  rawTotal(result: SponsorsListItem[]) {
    // we handle everything here because we have no guarantee
    // that the call fetch call gets canceled by another trigger
    const args = this.args;

    if (!args.pageSize) {
      // direct total if not handling pagination
      return of(result.length);
    }

    const isPrevious = args.pageIndex < this.currentPage;

    // reverse the order
    result = isPrevious ? result.reverse() : result;

    const total = isPrevious
      ? this.total
      : args.pageIndex * args.pageSize + result.length;

    // update the pagination controls
    this.currentPage = args.pageIndex;
    this.first = get(result[0], 'payload.doc');
    this.last = get(result[result.length - 1], 'payload.doc');

    if (isPrevious) {
      // restore the order
      this.arguments.orderDir = args.orderDir === 'desc' ? 'asc' : 'desc';
      return of(this.total);
    } else if (result.length < args.pageSize) {
      this.last = null;
      return of(total);
    }

    // check if there's a next
    return this.database
      .list({
        ...args,
        startAfter: [this.last],
        pageIndex: args.pageIndex + 1,
        limit: 1,
      })
      .pipe(map((res) => total + res.length));
  }

  rawResult(result: SponsorsListItem[]): Sponsor[] {
    return docsMapper(result);
  }

  filter(query: string, limit: number): void {
    throw new Error('Method not implemented.');
  }

  resFilter(result: Sponsor[]): DataSourceItem[] {
    throw new Error('Method not implemented.');
  }
}
