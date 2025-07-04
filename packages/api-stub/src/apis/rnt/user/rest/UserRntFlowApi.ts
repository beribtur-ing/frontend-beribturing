import { CommandResponse } from "~/models";
import axios from "axios";
import {
  UpdateAppearanceSettingsRntCommand,
  UpdateNotificationPreferencesRntCommand,
  UpdatePrivacySettingsRntCommand,
  UpdateSecuritySettingsRntCommand,
  ChangePasswordRntCommand,
} from '~/apis';

const url = (path: string) => `/api/feature/renter/user/${path}`;

const modifyProfile = (variables: {
  name: string;
  gender?: string;
  email?: string;
  address?: string;
  location?: string;
  profileImage?: File;
}) => {
  const formData = new FormData();

  // Add command fields
  formData.append('name', variables.name);
  if (variables.gender) formData.append('gender', variables.gender);
  if (variables.email) formData.append('email', variables.email);
  if (variables.address) formData.append('address', variables.address);
  if (variables.location) formData.append('location', variables.location);

  // Add profile image if provided
  if (variables.profileImage) {
    formData.append('profileImage', variables.profileImage);
  }

  return axios.post<CommandResponse<boolean>>(url('modify-profile/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateNotificationPreferences = (command: UpdateNotificationPreferencesRntCommand) => {
  return axios.post<CommandResponse<string>>(url('update-notification-preferences/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updatePrivacySettings = (command: UpdatePrivacySettingsRntCommand) => {
  return axios.post<CommandResponse<string>>(url('update-privacy-settings/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateSecuritySettings = (command: UpdateSecuritySettingsRntCommand) => {
  return axios.post<CommandResponse<string>>(url('update-security-settings/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateAppearanceSettings = (command: UpdateAppearanceSettingsRntCommand) => {
  return axios.post<CommandResponse<string>>(url('update-appearance-settings/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const changePassword = (command: ChangePasswordRntCommand) => {
  return axios.post<CommandResponse<string>>(url('change-password/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  modifyProfile,
  updateNotificationPreferences,
  updatePrivacySettings,
  updateSecuritySettings,
  updateAppearanceSettings,
  changePassword,
}