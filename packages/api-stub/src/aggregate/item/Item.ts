import { DomainEntity } from '../../core';
import { ItemStatus, ItemCategory } from './vo';

export interface Item extends DomainEntity {
  name: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  images: string[];
  location: string;
  ownerId: string;
  specifications: Record<string, string>;
  condition: string;
  availableFrom: Date;
  availableTo: Date;
} 