export interface RntEmailNotifications {
  rentalReminders: boolean;
  newMessages: boolean;
}

export interface RntPushNotifications {
  rentalReminders: boolean;
  newMessages: boolean;
  promotionsAndDeals: boolean;
}

export interface RntSmsNotifications {
  rentalReminders: boolean;
  newMessages: boolean;
}

export interface RntMarketingNotifications {
  promotionsAndDeals: boolean;
  marketingEmails: boolean;
}

export interface UpdateNotificationPreferencesRntCommand {
  emailNotifications: RntEmailNotifications;
  pushNotifications: RntPushNotifications;
  smsNotifications: RntSmsNotifications;
  marketingNotifications: RntMarketingNotifications;
}