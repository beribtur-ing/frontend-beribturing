import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { 
  CommandResponse, 
  UserRntFlowApi, 
  UpdateNotificationPreferencesRntCommand,
  RntEmailNotifications, 
  RntPushNotifications, 
  RntSmsNotifications, 
  RntMarketingNotifications 
} from '@beribturing/api-stub';

export interface NotificationPreferences {
  emailNotifications: RntEmailNotifications;
  pushNotifications: RntPushNotifications;
  smsNotifications: RntSmsNotifications;
  marketingNotifications: RntMarketingNotifications;
}

export const useNotificationPreferences = () => {
  const defaultNotificationPreferences: NotificationPreferences = {
    emailNotifications: {
      rentalReminders: true,
      newMessages: true,
    },
    pushNotifications: {
      rentalReminders: true,
      newMessages: true,
      promotionsAndDeals: false,
    },
    smsNotifications: {
      rentalReminders: false,
      newMessages: false,
    },
    marketingNotifications: {
      promotionsAndDeals: false,
      marketingEmails: true,
    },
  };

  return {
    defaultNotificationPreferences,

    mutation: {
      updateNotificationPreferences: useMutation<
        AxiosResponse<CommandResponse<string>>,
        unknown,
        UpdateNotificationPreferencesRntCommand
      >({
        mutationFn: UserRntFlowApi.updateNotificationPreferences,
      }),
    },
  };
};