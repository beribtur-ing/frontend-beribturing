import {ModifyProfileOwnCommand} from "~/apis";
import {CommandResponse} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/owner/user/${path}`;


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

export default {
  modifyProfile,
}