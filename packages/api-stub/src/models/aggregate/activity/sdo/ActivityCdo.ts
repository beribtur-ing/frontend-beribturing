import {CreationDataObject} from '~/models';
import {ActivityType} from '~/models/aggregate/activity';

export interface ActivityCdo extends CreationDataObject {
  //
  userId: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  relatedEntityId: string;
}
