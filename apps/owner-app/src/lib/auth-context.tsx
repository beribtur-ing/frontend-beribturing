import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - in real app, you'd call your API
    if (email === "owner@example.com" && password === "password") {
      const newUser = {
        id: "1",
        name: "John Doe",
        email: "owner@example.com",
      }
      setUser(newUser)
      try {
        localStorage.setItem("user", JSON.stringify(newUser))
      } catch (error) {
        console.error("Error saving user to localStorage:", error)
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error removing user from localStorage:", error)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
