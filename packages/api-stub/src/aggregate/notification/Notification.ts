import { DomainEntity } from '../../core';
import { NotificationType } from './vo';

export interface Notification extends DomainEntity {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data: Record<string, any>;
} 