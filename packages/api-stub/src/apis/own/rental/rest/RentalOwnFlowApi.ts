import {
  ModifyRentalRecordOwnCommand,
  RegisterItemConditionCheckOwnCommand,
  RegisterItemConditionPhotoOwnCommand,
  RegisterRentalRecordOwnCommand
} from '~/apis';
import { CommandResponse, RentalRecordCdo, ItemConditionCheckCdo, ItemConditionPhotoCdo, NameValueList } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/rental/${path}`;

const registerRentalRecord = (variables: {
  rentalRecordCdo: RentalRecordCdo;
}) => {
  const command = <RegisterRentalRecordOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-rental-record/command'), command);
};

const modifyRentalRecord = (variables: {
  rentalRecordId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyRentalRecordOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-rental-record/command'), command);
};

const registerItemConditionCheck = (variables: {
  itemConditionCheckCdo: ItemConditionCheckCdo;
}) => {
  const command = <RegisterItemConditionCheckOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-item-condition-check/command'), command);
};

const registerItemConditionPhoto = (variables: {
  itemConditionPhotoCdo: ItemConditionPhotoCdo;
}) => {
  const command = <RegisterItemConditionPhotoOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-item-condition-photo/command'), command);
};

export default {
  registerRentalRecord,
  modifyRentalRecord,
  registerItemConditionCheck,
  registerItemConditionPhoto,
};