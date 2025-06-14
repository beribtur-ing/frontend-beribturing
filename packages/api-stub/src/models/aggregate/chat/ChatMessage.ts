import { DomainEntity } from '~/models';
import { Communicable } from '../user/vo';

export interface ChatMessage extends DomainEntity {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}
