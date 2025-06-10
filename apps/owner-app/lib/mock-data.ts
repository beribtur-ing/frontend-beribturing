import type { Product, ProductVariant, Reservation, RentalRecord, Transaction, DashboardStats, Lendee } from "./types"

export const mockLendees: Lendee[] = [
  {
    id: "1",
    name: "John Smith",
    phoneNumber: "+1234567890",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    createdBy: "system",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phoneNumber: "+1234567891",
    isActive: true,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    createdBy: "system",
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Professional DSLR Camera",
    description: "High-quality Canon EOS R5 perfect for photography and videography",
    ownerId: "owner-1",
    categoryId: "electronics",
    category: {
      id: "electronics",
      name: "Electronics",
      description: "Electronic devices and gadgets",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "system",
    },
    variants: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    createdBy: "owner-1",
  },
  {
    id: "2",
    title: "Mountain Bike",
    description: "Trek mountain bike suitable for all terrains",
    ownerId: "owner-1",
    categoryId: "sports",
    category: {
      id: "sports",
      name: "Sports & Recreation",
      description: "Sports equipment and recreational items",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "system",
    },
    variants: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    createdBy: "owner-1",
  },
]

export const mockVariants: ProductVariant[] = [
  {
    id: "var-1",
    productId: "1",
    brand: "Canon",
    model: "EOS R5",
    color: "Black",
    size: "Standard",
    material: "Metal/Plastic",
    price: {
      daily: 50,
      weekly: 300,
      monthly: 1000,
      currency: "USD",
    },
    isActive: true,
    images: [
      {
        id: "img-1",
        url: "/placeholder.svg?height=300&width=400",
        variantId: "var-1",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
    ],
    reservations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "owner-1",
  },
  {
    id: "var-2",
    productId: "2",
    brand: "Trek",
    model: "X-Caliber 8",
    color: "Blue",
    size: "Large",
    material: "Aluminum",
    price: {
      daily: 25,
      weekly: 150,
      monthly: 500,
      currency: "USD",
    },
    isActive: true,
    images: [
      {
        id: "img-2",
        url: "/placeholder.svg?height=300&width=400",
        variantId: "var-2",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: "system",
      },
    ],
    reservations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "owner-1",
  },
]

export const mockReservations: Reservation[] = [
  {
    id: "res-1",
    requesterId: "1",
    productVariantId: "var-1",
    status: "CONFIRMED",
    period: {
      startDate: new Date("2024-06-15"),
      endDate: new Date("2024-06-20"),
    },
    note: "Need for wedding photography",
    requester: mockLendees[0],
    productVariant: mockVariants[0],
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
    createdBy: "1",
  },
  {
    id: "res-2",
    requesterId: "2",
    productVariantId: "var-2",
    status: "PENDING",
    period: {
      startDate: new Date("2024-06-25"),
      endDate: new Date("2024-06-30"),
    },
    note: "Weekend mountain biking trip",
    requester: mockLendees[1],
    productVariant: mockVariants[1],
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-05"),
    createdBy: "2",
  },
]

export const mockRentalRecords: RentalRecord[] = [
  {
    id: "rental-1",
    lendeeId: "1",
    productVariantId: "var-1",
    status: "COMPLETED",
    rentedAt: new Date("2024-05-01"),
    returnedAt: new Date("2024-05-05"),
    fee: 200,
    period: {
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-05-05"),
    },
    lendee: mockLendees[0],
    productVariant: mockVariants[0],
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-05"),
    createdBy: "system",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "txn-1",
    payerId: "1",
    payeeId: "owner-1",
    rentalRecordId: "rental-1",
    totalAmount: 200,
    payeeAmount: 170,
    commissionAmount: 30,
    status: "COMPLETED",
    initiatedAt: new Date("2024-05-01"),
    completedAt: new Date("2024-05-01"),
    paymentProvider: "stripe",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
    createdBy: "system",
  },
]

export const mockDashboardStats: DashboardStats = {
  totalProperties: 2,
  activeBookings: 1,
  totalRevenue: 1250,
  monthlyRevenue: 450,
  occupancyRate: 75,
  pendingMessages: 3,
}

export const mockRevenueData = [
  { month: "Jan", revenue: 1200, bookings: 8 },
  { month: "Feb", revenue: 1800, bookings: 12 },
  { month: "Mar", revenue: 2200, bookings: 15 },
  { month: "Apr", revenue: 1900, bookings: 11 },
  { month: "May", revenue: 2500, bookings: 18 },
  { month: "Jun", revenue: 2100, bookings: 14 },
]
