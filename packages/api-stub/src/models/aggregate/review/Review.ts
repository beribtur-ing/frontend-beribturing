import { DomainEntity } from '~/models';

export interface Review extends DomainEntity {
  reviewerId: string;
  rating: number;
  comment: string;
  recordId: string;
  visible: boolean;
}
