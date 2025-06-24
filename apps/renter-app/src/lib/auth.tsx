
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { AccountSignInTokenRdo, UserMeRdo } from '@beribturing/api-stub'


interface AuthContextType {
  user: UserMeRdo | null
  loading: boolean
  tokens: AccountSignInTokenRdo | null
  signIn: (phoneNumber: string, password: string) => Promise<boolean>
  signOut: () => void
  setUser: (user: UserMeRdo | null) => void
  setTokens: (tokens: AccountSignInTokenRdo | null) => void
  updateProfile: (updatedUser: UserMeRdo) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserMeRdo | null>(null)
  const [tokens, setTokens] = useState<AccountSignInTokenRdo | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem("renter_user")
          const storedTokens = localStorage.getItem("renter_tokens")

          if (storedUser && storedTokens) {
            setUser(JSON.parse(storedUser))
            setTokens(JSON.parse(storedTokens))
          }
        }
      } catch (error) {
        console.error("Session validation error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (phoneNumber: string, password: string) => {
    try {
      setLoading(true)
      // This will be handled by the useAuth hook
      return true
    } catch (error) {
      console.error("Sign in error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    setTokens(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("renter_user")
      localStorage.removeItem("renter_tokens")
    }
  }

  const updateUser = (newUser: UserMeRdo | null) => {
    setUser(newUser)
    if (newUser && typeof window !== 'undefined') {
      localStorage.setItem("renter_user", JSON.stringify(newUser))
    }
  }

  const updateTokens = (newTokens: AccountSignInTokenRdo | null) => {
    setTokens(newTokens)
    if (newTokens && typeof window !== 'undefined') {
      localStorage.setItem("renter_tokens", JSON.stringify(newTokens))
    }
  }

  const updateProfile = async (updatedUser: UserMeRdo): Promise<boolean> => {
    try {
      setLoading(true)
      // Here you would typically make an API call to update the user profile
      // For now, we'll just update the local state
      updateUser(updatedUser)
      return true
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        tokens,
        signIn,
        signOut,
        setUser: updateUser,
        setTokens: updateTokens,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
