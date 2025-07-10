import {DomainEntity} from '~/models';
import {ActivityType} from '~/models/aggregate/activity/vo';

export interface Activity extends DomainEntity {
  //
  userId: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  relatedEntityId: string;
}
