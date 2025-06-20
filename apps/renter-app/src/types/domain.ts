// Base Domain Entity
export interface DomainEntity {
  id: string // UUID
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

// Core Interfaces
export type Communicable = {}

export type ConditionCheckable = {}

export type Discountable = {}

export type Notifiable = {}

// Enums
export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export enum DiscountScope {
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  USER = "USER",
  GLOBAL = "GLOBAL",
}

export enum LenderType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
}

export enum NotificationType {
  RESERVATION_REQUEST = "RESERVATION_REQUEST",
  RESERVATION_APPROVED = "RESERVATION_APPROVED",
  RESERVATION_DECLINED = "RESERVATION_DECLINED",
  RENTAL_STARTED = "RENTAL_STARTED",
  RENTAL_REMINDER = "RENTAL_REMINDER",
  RENTAL_RETURNED = "RENTAL_RETURNED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  REVIEW_RECEIVED = "REVIEW_RECEIVED",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum RentalStatus {
  RESERVED = "RESERVED",
  ACTIVE = "ACTIVE",
  RETURNED = "RETURNED",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export enum DepositStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  FORFEITED = "FORFEITED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum ConditionCheckType {
  PRE_RENTAL = "PRE_RENTAL",
  POST_RENTAL = "POST_RENTAL",
  MAINTENANCE = "MAINTENANCE",
}

export enum ProductAvailability {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  MAINTENANCE = "MAINTENANCE",
  UNAVAILABLE = "UNAVAILABLE",
}

// Value Objects
export interface Currency {
  amount: number
  currencyCode: string
}

export interface Price {
  dailyRate: Currency
  weeklyRate?: Currency
  monthlyRate?: Currency
}

export interface Period {
  startDate: Date
  endDate: Date
}

export interface Size {
  length?: number
  width?: number
  height?: number
  weight?: number
  unit: string
}

export interface Profile {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  profilePictureUrl?: string
}

// Main Entities
export interface ChatMessage extends DomainEntity {
  senderId: string
  receiverId: string
  sender: Communicable
  receiver: Communicable
  content: string
  isRead: boolean
  timestamp: Date
}

export interface Discount extends DomainEntity {
  name: string
  type: DiscountType
  scope: DiscountScope
  amount: number
  targetId: string
  target: Discountable
  active: boolean
  startDate: Date
  endDate: Date
}

export interface ItemConditionPhoto extends DomainEntity {
  checkId: string
  itemConditionCheck: ItemConditionCheck
  url: string
}

export interface ItemConditionCheck extends DomainEntity {
  rentalRecordId: string
  variantId: string
  checkedBy: string
  rentalRecord: RentalRecord
  checker: ConditionCheckable
  checkType: ConditionCheckType
  photos: ItemConditionPhoto[]
}

export interface Lendee extends DomainEntity, Communicable, Notifiable, Discountable {
  name: string
  phoneNumber: string
  passwordHash: string
  isActive: boolean
  profile: Profile
  reservations: Reservation[]
  rentalRecords: RentalRecord[]
  deposits: RentalDeposit[]
  reviews: Review[]
  reports: Report[]
}

export interface Lender extends DomainEntity, Communicable, Notifiable {
  name: string
  phoneNumber: string
  passwordHash: string
  lenderType: LenderType
  isActive: boolean
  profile: Profile
  listedItems: Product[]
}

export interface Notification extends DomainEntity {
  recipientId: string
  recipient: Notifiable
  type: NotificationType
  message: string
  isRead: boolean
  timestamp: Date
}

export interface ProductCategory extends DomainEntity, Discountable {
  name: string
  description: string
  parentId?: string
  subCategories: ProductCategory[]
}

export interface Product extends DomainEntity, Discountable {
  ownerId: string
  categoryId: string
  owner: Lendee
  category: ProductCategory
  title: string
  description: string
  variants: ProductVariant[]
}

export interface ProductImage extends DomainEntity {
  variantId: string
  variant: ProductVariant
  url: string
  order: number
}

export interface ProductVariant extends DomainEntity, Discountable {
  productId: string
  product: Product
  brand: string
  model: string
  manufacturer: string
  producedYear: string
  madeIn: string
  color: string
  material: string
  size: Size
  manual: string
  notes: string
  price: Price
  availability: ProductAvailability
  isActive: boolean
  images: ProductImage[]
  reservations: Reservation[]
}

export interface RentalDeposit extends DomainEntity {
  rentalRecordId: string
  payerId: string
  rentalRecord: RentalRecord
  payer: Lendee
  amount: Currency
  status: DepositStatus
  paidAt?: Date
  resolvedAt?: Date
  notes: string
}

export interface RentalRecord extends DomainEntity {
  lendeeId: string
  productVariantId: string
  discountId?: string
  depositId?: string
  lendee: Lendee
  productVariant: ProductVariant
  discount?: Discount
  deposit?: RentalDeposit
  reservation: Reservation
  period: Period
  status: RentalStatus
  fee: number
  rentedAt?: Date
  returnedAt?: Date
  cancelledAt?: Date
  beforeRented: ItemConditionCheck
  afterReturned?: ItemConditionCheck
}

export interface Report extends DomainEntity {
  reporterId: string
  reporter: Lendee
  record: RentalRecord
  reason: string
  reportDate: Date
  resolved: boolean
}

export interface Reservation extends DomainEntity {
  requesterId: string
  productVariantId: string
  requester: Lendee
  productVariant: ProductVariant
  period: Period
  status: ReservationStatus
  note: string
}

export interface Review extends DomainEntity {
  reviewerId: string
  reviewer: Lendee
  record: RentalRecord
  rating: number
  comment: string
}

export interface Transaction extends DomainEntity {
  rentalRecordId: string
  payerId: string
  payeeId: string
  rentalRecord: RentalRecord
  payer: Lendee
  payee: Lender
  totalAmount: Currency
  payeeAmount: Currency
  commissionAmount: Currency
  status: PaymentStatus
  paymentProvider: string
  initiatedAt: Date
  completedAt?: Date
}
