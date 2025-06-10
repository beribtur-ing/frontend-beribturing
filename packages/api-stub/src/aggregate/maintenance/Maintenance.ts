import { DomainEntity } from '../../core';
import { MaintenanceStatus } from './vo';

export interface Maintenance extends DomainEntity {
  itemId: string;
  description: string;
  status: MaintenanceStatus;
  scheduledDate: Date;
  completedDate: Date;
  cost: number;
  technician: string;
  notes: string;
} 