export interface DomainEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface Lender extends DomainEntity {
  name: string
  phoneNumber: string
  isActive: boolean
  lenderType: "INDIVIDUAL" | "BUSINESS"
  listedItems: Product[]
}

export interface Product extends DomainEntity {
  title: string
  description: string
  ownerId: string
  categoryId: string
  category: ProductCategory
  variants: ProductVariant[]
}

export interface ProductVariant extends DomainEntity {
  productId: string
  brand: string
  model: string
  color: string
  size: string
  material: string
  price: {
    daily: number
    weekly: number
    monthly: number
    currency: string
  }
  isActive: boolean
  images: ProductImage[]
  reservations: Reservation[]
}

export interface ProductImage extends DomainEntity {
  url: string
  variantId: string
  order: number
}

export interface ProductCategory extends DomainEntity {
  name: string
  description: string
  parentId?: string
}

export interface Reservation extends DomainEntity {
  requesterId: string
  productVariantId: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  period: {
    startDate: Date
    endDate: Date
  }
  note?: string
  requester: Lendee
  productVariant: ProductVariant
}

export interface RentalRecord extends DomainEntity {
  lendeeId: string
  productVariantId: string
  status: "ACTIVE" | "COMPLETED" | "CANCELLED"
  rentedAt: Date
  returnedAt?: Date
  fee: number
  period: {
    startDate: Date
    endDate: Date
  }
  lendee: Lendee
  productVariant: ProductVariant
}

export interface Lendee extends DomainEntity {
  name: string
  phoneNumber: string
  isActive: boolean
}

export interface Transaction extends DomainEntity {
  payerId: string
  payeeId: string
  rentalRecordId: string
  totalAmount: number
  payeeAmount: number
  commissionAmount: number
  status: "PENDING" | "COMPLETED" | "FAILED"
  initiatedAt: Date
  completedAt?: Date
  paymentProvider: string
}

export interface DashboardStats {
  totalProperties: number
  activeBookings: number
  totalRevenue: number
  monthlyRevenue: number
  occupancyRate: number
  pendingMessages: number
}
