import {ChannelType, NotificationMessage, NotificationType, Status} from '~/models';

export interface Notification {
  //
  receiverId: string;
  senderId: string;
  message: NotificationMessage;
  type: NotificationType;
  channelType: ChannelType;
  status: Status;
  sentAt: string;
  receivedAt: string;
}
