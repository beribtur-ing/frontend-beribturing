import { CreationDataObject } from '../../../core';

export interface ReportCdo extends CreationDataObject {
  reporterId: string;
  reportedId: string;
  type: string;
  description: string;
  status: string;
  createdAt: Date;
} 