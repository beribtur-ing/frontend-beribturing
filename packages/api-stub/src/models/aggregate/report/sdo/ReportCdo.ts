import { CreationDataObject } from '~/models';

export interface ReportCdo extends CreationDataObject {
  reporterId: string;
  reason: string;
  recordId: string;
}
