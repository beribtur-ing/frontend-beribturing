import {ValueObject} from '~/models';

export interface NotificationMessage extends ValueObject {
  //
  title: string;
  body: string;
  additionalInfo: Map<string, string>;
}
