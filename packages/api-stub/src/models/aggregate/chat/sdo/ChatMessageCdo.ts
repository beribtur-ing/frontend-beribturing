import { CreationDataObject } from '~/models';

export interface ChatMessageCdo extends CreationDataObject {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}