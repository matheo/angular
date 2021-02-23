import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  Query,
} from '@angular/fire/firestore';
import { doc, docExists } from '../operators';
import { Sponsor, SponsorsListRequest } from './sponsors.types';

@Injectable()
export class SponsorsDatabase {
  /**
   * The Database translates the Datasource request to the backend.
   */
  constructor(private db: AngularFirestore) {}

  single(id: string) {
    return this.db
      .doc<Sponsor>(`sponsors/${id}`)
      .snapshotChanges()
      .pipe(docExists<Sponsor>(), doc());
  }

  list(args: SponsorsListRequest) {
    return this.db
      .collection<Sponsor>('sponsors', (ref) => {
        let query: CollectionReference | Query = ref;

        // filtering
        if (args.tier) {
          query = query.where('tier', '==', args.tier);
        }

        // sorting
        if (args.orderBy) {
          query = query.orderBy(args.orderBy, args.orderDir);
        }

        // pagination
        if (args.pageSize || args.limit) {
          if (args.startAt) {
            query = query.startAt(...args.startAt);
          }
          if (args.startAfter) {
            query = query.startAfter(...args.startAfter);
          }
          if (args.endAt) {
            query = query.endAt(...args.endAt);
          }
          if (args.endBefore) {
            query = query.endBefore(...args.endBefore);
          }

          query = query.limit(args.limit || args.pageSize);
        }

        return query;
      })
      .snapshotChanges();
  }
}
