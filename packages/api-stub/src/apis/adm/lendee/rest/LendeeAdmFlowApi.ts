import { ModifyLendeeStatusCommand } from '~/apis';
import { CommandResponse } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/lendee/${path}`;

const modifyLendeeStatus = (variables: {
  lendeeId: string;
}) => {
  const command = <ModifyLendeeStatusCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-lendee-status/command'), command);
};

export default {
  modifyLendeeStatus,
};
