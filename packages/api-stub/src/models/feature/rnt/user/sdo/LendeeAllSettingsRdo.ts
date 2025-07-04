import {
  RntEmailNotifications,
  RntPushNotifications,
  RntSmsNotifications,
  RntMarketingNotifications,
} from "../../../../../apis/rnt/user/command/UpdateNotificationPreferencesRntCommand";

export interface LendeeNotificationPreferences {
  emailNotifications: RntEmailNotifications;
  pushNotifications: RntPushNotifications;
  smsNotifications: RntSmsNotifications;
  marketingNotifications: RntMarketingNotifications;
}

export interface LendeePrivacySettingsRdo {
  showProfile: boolean;
  showRentals: boolean;
  showReviews: boolean;
  locationSharing: boolean;
  dataCollection: boolean;
}

export interface LendeeSecuritySettingsRdo {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: string;
}

export interface LendeeAppearanceSettingsRdo {
  darkMode: boolean;
  compactView: boolean;
  language: string;
}

export interface LendeeAllSettingsRdo {
  notificationPreferences: LendeeNotificationPreferences;
  privacySettings: LendeePrivacySettingsRdo;
  securitySettings: LendeeSecuritySettingsRdo;
  appearanceSettings: LendeeAppearanceSettingsRdo;
}