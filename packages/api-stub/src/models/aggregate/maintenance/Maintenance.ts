import { DomainEntity } from '~/models';
import { MaintenanceStatus } from './vo';

export interface MaintenanceRequest extends DomainEntity {
  productVariantId: string;
  requesterId: string;
  ownerId: string;
  rentalRecordId: string;
  description: string;
  status: MaintenanceStatus;
  requestedAt: Date;
  resolvedAt: Date;
  resolution: string;
}
