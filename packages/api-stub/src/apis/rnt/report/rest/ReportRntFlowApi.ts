import {
  ModifyReportRntCommand,
  RegisterReportRntCommand,
  RemoveReportRntCommand
} from '~/apis';
import { CommandResponse, NameValueList, ReportCdo } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/report/${path}`;

const registerReport = (variables: {
  reportCdo: ReportCdo;
}) => {
  const command = <RegisterReportRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-report/command'), command);
};

const modifyReport = (variables: {
  reportId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyReportRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-report/command'), command);
};

const removeReport = (variables: {
  reportId: string;
}) => {
  const command = <RemoveReportRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-report/command'), command);
};

export default {
  registerReport,
  modifyReport,
  removeReport,
}
