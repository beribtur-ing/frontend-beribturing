import { NameValueList } from '~/models';

export interface ModifyReportRntCommand {
  reportId: string;
  nameValueList: NameValueList;
}