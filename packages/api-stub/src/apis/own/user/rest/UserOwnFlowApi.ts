import {ModifyProfileOwnCommand, UpdateNotificationPreferencesOwnCommand, ChangePasswordOwnCommand} from "~/apis";
import {CommandResponse} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/owner/user/${path}`;


const modifyProfile = (variables: {
  name: string;
  gender?: string;
  email?: string;
  address?: string;
  location?: { latitude: number; longitude: number };
  image?: File;
}) => {
  const formData = new FormData();
  
  // Create command object
  const command: any = {
    name: variables.name,
  };
  
  if (variables.gender) command.gender = variables.gender;
  if (variables.email) command.email = variables.email;
  if (variables.address) command.address = variables.address;
  if (variables.location) command.location = variables.location;
  
  // Add command as JSON blob with proper content type
  const commandBlob = new Blob([JSON.stringify(command)], { type: 'application/json' });
  formData.append('command', commandBlob);
  
  // Add profile image if provided
  if (variables.image) {
    formData.append('image', variables.image);
  }
  
  return axios.post<CommandResponse<boolean>>(url('modify-profile/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateNotificationPreferences = (variables: {
  emailNotifications: {
    newBookingsAndReservations: boolean;
    messagesFromCustomers: boolean;
    paymentConfirmations: boolean;
  };
  smsNotifications: {
    newBookingsAndReservations: boolean;
    messagesFromCustomers: boolean;
    paymentConfirmations: boolean;
  };
}) => {
  const command = <UpdateNotificationPreferencesOwnCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('update-notification-preferences/command'), command);
};

const changePassword = (command: ChangePasswordOwnCommand) => {
  return axios.post<CommandResponse<string>>(url('change-password/command'), command, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  modifyProfile,
  updateNotificationPreferences,
  changePassword,
};