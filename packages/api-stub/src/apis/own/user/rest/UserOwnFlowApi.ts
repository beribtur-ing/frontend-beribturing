import {ModifyProfileOwnCommand} from "~/apis";
import {CommandResponse} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/owner/user/${path}`;


const modifyProfile = (variables: {
  name: string;
  gender?: string;
  email?: string;
  address?: string;
  location?: { latitude: number; longitude: number };
  profileImage?: File;
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
  if (variables.profileImage) {
    formData.append('profileImage', variables.profileImage);
  }
  
  return axios.post<CommandResponse<boolean>>(url('modify-profile/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  modifyProfile,
};