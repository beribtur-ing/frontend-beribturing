import { Lendee, Lender, Product, ProductCategory, ProductImage, ProductVariant, Reservation } from '~/models';

export interface ReservationDetailRdo {
  //
  reservation: Reservation;
  requester: Lendee;
  owner: Lender;
  product: Product;
  category: ProductCategory;
  variant: ProductVariant;
  images: ProductImage[];
}
