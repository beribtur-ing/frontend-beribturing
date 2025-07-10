import { DomainEntity } from '~/models';

export interface ChatMessage extends DomainEntity {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}
