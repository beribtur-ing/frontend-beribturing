export interface UpdateSecuritySettingsRntCommand {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: string;
}