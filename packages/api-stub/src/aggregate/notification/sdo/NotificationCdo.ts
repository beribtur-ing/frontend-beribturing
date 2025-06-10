import { CreationDataObject } from '../../../core';
import { NotificationType } from '../vo';

export interface NotificationCdo extends CreationDataObject {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data: Record<string, any>;
} 