import { DomainEntity } from '~/models';

export interface Report extends DomainEntity {
  reporterId: string;
  reason: string;
  reportDate: Date;
  resolved: boolean;
  recordId: string;
}