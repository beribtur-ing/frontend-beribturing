import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  CommandResponse,
  UserRntFlowApi,
  UpdateSecuritySettingsRntCommand,
  UpdateAppearanceSettingsRntCommand,
  RntEmailNotifications,
  RntPushNotifications,
  RntSmsNotifications,
  RntMarketingNotifications,
  UpdatePrivacySettingsRntCommand,
} from '@beribturing/api-stub';

export interface NotificationPreferences {
  emailNotifications: RntEmailNotifications;
  pushNotifications: RntPushNotifications;
  smsNotifications: RntSmsNotifications;
  marketingNotifications: RntMarketingNotifications;
}

export const useSettingsRntMutation = () => {
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
  const updateNotificationPreferences = useMutation<
    AxiosResponse<CommandResponse<string>>,
    unknown,
    NotificationPreferences
  >({
    mutationFn: (preferences: NotificationPreferences) => {
      return UserRntFlowApi.updateNotificationPreferences(preferences);
    },
  });

  const updatePrivacySettings = useMutation<
    AxiosResponse<CommandResponse<string>>,
    unknown,
    UpdatePrivacySettingsRntCommand
  >({
    mutationFn: (settings: UpdatePrivacySettingsRntCommand) => {
      return UserRntFlowApi.updatePrivacySettings(settings);
    },
  });

  const updateSecuritySettings = useMutation<
    AxiosResponse<CommandResponse<string>>,
    unknown,
    UpdateSecuritySettingsRntCommand
  >({
    mutationFn: (settings: UpdateSecuritySettingsRntCommand) => {
      return UserRntFlowApi.updateSecuritySettings(settings);
    },
  });

  const updateAppearanceSettings = useMutation<
    AxiosResponse<CommandResponse<string>>,
    unknown,
    UpdateAppearanceSettingsRntCommand
  >({
    mutationFn: (settings: UpdateAppearanceSettingsRntCommand) => {
      return UserRntFlowApi.updateAppearanceSettings(settings);
    },
  });

  return {
    defaultNotificationPreferences,
    mutation: {
      updateNotificationPreferences,
      updatePrivacySettings,
      updateSecuritySettings,
      updateAppearanceSettings,
    },
  };
};