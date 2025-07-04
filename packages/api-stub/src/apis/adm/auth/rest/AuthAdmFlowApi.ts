import { RefreshTokenAdmCommand } from '~/apis';
import {AccountSignInTokenRdo, CommandResponse, QueryResponse} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/auth/${path}`;

const refreshToken = (variables: {
  refreshToken: string;
}) => {
  const command = <RefreshTokenAdmCommand>{ ...variables };
  return axios.post<CommandResponse<AccountSignInTokenRdo>>(url('refresh-token/command'), command);
};

export default {
  refreshToken,
};
