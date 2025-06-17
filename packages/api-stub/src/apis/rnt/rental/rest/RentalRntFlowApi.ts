import {
  ModifyRentalRecordRntCommand,
  ModifyReservationRntCommand,
  RegisterItemConditionCheckRntCommand,
  RegisterItemConditionPhotoRntCommand,
  RegisterReservationRntCommand
} from '~/apis';
import {
  CommandResponse,
  NameValueList,
  ReservationCdo,
  ItemConditionCheckCdo,
  ItemConditionPhotoCdo
} from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/rental/${path}`;

const registerReservation = (variables: {
  reservationCdo: ReservationCdo;
}) => {
  const command = <RegisterReservationRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-reservation/command'), command);
};

const modifyReservation = (variables: {
  reservationId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyReservationRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-reservation/command'), command);
};

const modifyRentalRecord = (variables: {
  rentalRecordId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyRentalRecordRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-rental-record/command'), command);
};

const registerItemConditionCheck = (variables: {
  itemConditionCheckCdo: ItemConditionCheckCdo;
}) => {
  const command = <RegisterItemConditionCheckRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-item-condition-check/command'), command);
};

const registerItemConditionPhoto = (variables: {
  itemConditionPhotoCdo: ItemConditionPhotoCdo;
}) => {
  const command = <RegisterItemConditionPhotoRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-item-condition-photo/command'), command);
};

export default {
  registerReservation,
  modifyReservation,
  modifyRentalRecord,
  registerItemConditionCheck,
  registerItemConditionPhoto,
}
