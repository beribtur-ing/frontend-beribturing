import { DomainEntity } from '~/models';
import { NotificationType } from './vo';

export interface Notification extends DomainEntity {
  recipientId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
}
