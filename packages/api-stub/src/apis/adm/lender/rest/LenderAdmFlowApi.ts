import { ModifyLenderStatusCommand } from '~/apis';
import { CommandResponse } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/lender/${path}`;

const modifyLenderStatus = (variables: {
  lenderId: string;
}) => {
  const command = <ModifyLenderStatusCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-lender-status/command'), command);
};

export default {
  modifyLenderStatus,
};
