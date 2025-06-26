import { PriceUnit } from '~/models';

export interface Price {
  currency: string; // Using string to match existing Payment model pattern
  unit: PriceUnit;
}