import { DocumentChangeAction } from '@angular/fire/compat/firestore';

export type SponsorVisibility = 'Public' | 'Private';

export interface Sponsor {
  id: string;
  name: string;
  tier: number;
  visibility: SponsorVisibility;
  following: boolean;
}

export interface SponsorsListRequest {
  tier?: number;
  following?: boolean;
  visibility?: SponsorVisibility;
  // sort
  orderBy?: string;
  orderDir?: 'desc' | 'asc';
  // pagination
  pageIndex?: number;
  pageSize?: number;
  limit?: number; // pageSize override for total check
  startAt?: Array<any>;
  startAfter?: Array<any>;
  endAt?: Array<any>;
  endBefore?: Array<any>;
}

export type SponsorsListItem = DocumentChangeAction<Sponsor>;
