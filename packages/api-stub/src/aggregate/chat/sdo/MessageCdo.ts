import { CreationDataObject } from '../../../core';

export interface MessageCdo extends CreationDataObject {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
} 