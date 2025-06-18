import { PlaceholderImage } from "~/assets"

export interface User {
  id: string
  name: string
  email: string
  type: "lendee" | "lender"
  isActive: boolean
  phoneNumber: string
  joinedAt: string
  totalRentals?: number
  totalListings?: number
}

export interface Property {
  id: string
  title: string
  description: string
  category: string
  owner: string
  ownerId: string
  status: "active" | "pending" | "rejected" | "flagged"
  price: number
  currency: string
  images: string[]
  createdAt: string
  totalBookings: number
}

export interface Booking {
  id: string
  propertyId: string
  propertyTitle: string
  lendeeId: string
  lendeeName: string
  lenderId: string
  lenderName: string
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled"
  startDate: string
  endDate: string
  totalAmount: number
  currency: string
  createdAt: string
}

export interface SystemStats {
  totalUsers: number
  activeRentals: number
  totalRevenue: number
  pendingApprovals: number
  totalProperties: number
  supportTickets: number
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    type: "lendee",
    isActive: true,
    phoneNumber: "+998 90 123-45-67",
    joinedAt: "2024-01-15",
    totalRentals: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    type: "lender",
    isActive: true,
    phoneNumber: "+998 91 234-56-78",
    joinedAt: "2024-02-20",
    totalListings: 8,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    type: "lendee",
    isActive: false,
    phoneNumber: "+998 93 345-67-89",
    joinedAt: "2024-03-10",
    totalRentals: 3,
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@example.com",
    type: "lender",
    isActive: true,
    phoneNumber: "+998 95 456-78-90",
    joinedAt: "2024-01-05",
    totalListings: 15,
  },
]

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Professional Camera Kit",
    description: "High-end DSLR camera with lenses",
    category: "Electronics",
    owner: "Jane Smith",
    ownerId: "2",
    status: "active",
    price: 150,
    currency: "USD",
    images: [PlaceholderImage],
    createdAt: "2024-02-25",
    totalBookings: 23,
  },
  {
    id: "2",
    title: "Mountain Bike",
    description: "Trek mountain bike, perfect for trails",
    category: "Sports",
    owner: "Alice Johnson",
    ownerId: "4",
    status: "pending",
    price: 75,
    currency: "USD",
    images: [PlaceholderImage],
    createdAt: "2024-03-01",
    totalBookings: 0,
  },
  {
    id: "3",
    title: "Power Drill Set",
    description: "Complete power drill set with bits",
    category: "Tools",
    owner: "Alice Johnson",
    ownerId: "4",
    status: "flagged",
    price: 45,
    currency: "USD",
    images: [PlaceholderImage],
    createdAt: "2024-02-15",
    totalBookings: 8,
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Professional Camera Kit",
    lendeeId: "1",
    lendeeName: "John Doe",
    lenderId: "2",
    lenderName: "Jane Smith",
    status: "active",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    totalAmount: 750,
    currency: "USD",
    createdAt: "2024-03-10",
  },
  {
    id: "2",
    propertyId: "3",
    propertyTitle: "Power Drill Set",
    lendeeId: "3",
    lendeeName: "Bob Wilson",
    lenderId: "4",
    lenderName: "Alice Johnson",
    status: "completed",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    totalAmount: 225,
    currency: "USD",
    createdAt: "2024-02-18",
  },
  {
    id: "3",
    propertyId: "1",
    propertyTitle: "Professional Camera Kit",
    lendeeId: "3",
    lendeeName: "Bob Wilson",
    lenderId: "2",
    lenderName: "Jane Smith",
    status: "pending",
    startDate: "2024-03-25",
    endDate: "2024-03-30",
    totalAmount: 750,
    currency: "USD",
    createdAt: "2024-03-12",
  },
]

export const mockSystemStats: SystemStats = {
  totalUsers: 1247,
  activeRentals: 89,
  totalRevenue: 125430,
  pendingApprovals: 12,
  totalProperties: 456,
  supportTickets: 7,
}

export const mockAnalyticsData = {
  revenue: [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 15000 },
    { month: "Mar", amount: 18000 },
    { month: "Apr", amount: 22000 },
    { month: "May", amount: 25000 },
    { month: "Jun", amount: 28000 },
  ],
  topProperties: [
    { name: "Professional Camera Kit", earnings: 4500 },
    { name: "Mountain Bike", earnings: 3200 },
    { name: "Power Drill Set", earnings: 2800 },
    { name: "Gaming Console", earnings: 2400 },
    { name: "Camping Gear", earnings: 2100 },
  ],
  userGrowth: [
    { month: "Jan", users: 1000 },
    { month: "Feb", users: 1050 },
    { month: "Mar", users: 1120 },
    { month: "Apr", users: 1180 },
    { month: "May", users: 1220 },
    { month: "Jun", users: 1247 },
  ],
}
