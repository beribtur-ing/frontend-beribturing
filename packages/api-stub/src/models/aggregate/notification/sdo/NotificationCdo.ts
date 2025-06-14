import { CreationDataObject } from '~/models';
import { NotificationType } from '../vo';

export interface NotificationCdo extends CreationDataObject {
  recipientId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
}
