import { PriceUnit, Currency } from '~/models';

export interface Price {
  currency: Currency;
  unit: PriceUnit;
}
