import { Period, ReservationStatus, Size } from '~/models';


export interface ReservationRdo {
  id: string;
  ownerName: string;
  requesterName: string;
  period: Period;
  status: ReservationStatus;
  productId: string;
  productName: string;
  variantId: string;
  variantBrand: string;
  variantModel: string;
  variantColor: string;
  variantSize: Size;
}
