"use client"
import {createContext, type ReactNode, useContext, useEffect, useState} from "react"
import type {Lendee} from "@/types/domain"

interface AuthContextType {
  user: Lendee | null
  isLoading: boolean
  signIn: (phone: string, password: string) => Promise<boolean>
  signOut: () => void
  updateProfile: (updates: Partial<Lendee>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock user data
const mockUser: Lendee = {
  id: "user-123",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date(),
  createdBy: "system",
  name: "Sarah Johnson",
  phoneNumber: "+1-555-0123",
  passwordHash: "hashed_password",
  isActive: true,
  profile: {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    address: "123 Main Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "USA",
    profilePictureUrl: "/placeholder.svg?height=120&width=120",
  },
  reservations: [],
  rentalRecords: [],
  deposits: [],
  reviews: [],
  reports: [],
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Lendee | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("renthub_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("renthub_user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const signIn = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would validate against backend
    if (phone === "(555) 123-4567" && password === "password") {
      setUser(mockUser)
      localStorage.setItem("renthub_user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("renthub_user")
  }

  const updateProfile = async (updates: Partial<Lendee>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...updates, updatedAt: new Date() }
    setUser(updatedUser)
    localStorage.setItem("renthub_user", JSON.stringify(updatedUser))

    setIsLoading(false)
    return true
  }

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
