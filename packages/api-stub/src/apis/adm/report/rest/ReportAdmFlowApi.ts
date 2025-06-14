import { ResolveReportAdmCommand } from '~/apis';
import { CommandResponse } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/report/${path}`;

const resolveReport = (variables: {
  reportId: string;
}) => {
  const command = <ResolveReportAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/resolve-report/command'), command);
};

export default {
  resolveReport,
};