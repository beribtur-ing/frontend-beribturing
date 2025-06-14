import { DomainEntity } from '~/models';

export interface ItemConditionPhoto extends DomainEntity {
  checkId: string;
  url: string;
}
