import {CreationDataObject, NotificationMessage} from '~/models';
import {ChannelType, NotificationType } from '../vo';

export interface NotificationCdo extends CreationDataObject {
  //
  senderId: string
  receiverId: string;
  type: NotificationType;
  message: NotificationMessage;
  channelType: ChannelType;
}
