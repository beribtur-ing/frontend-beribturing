import { DomainEntity } from '~/models';

export interface MaintenancePhoto extends DomainEntity {
  maintenanceRequestId: string;
  url: string;
  description: string;
  order: number;
}