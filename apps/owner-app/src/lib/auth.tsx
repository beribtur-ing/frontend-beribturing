import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { AccountSignInTokenRdo } from '@beribturing/api-stub'

export interface User {
  id: string
  name: string
  phoneNumber: string
  role: "owner"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  tokens: AccountSignInTokenRdo | null
  signIn: (phoneNumber: string, password: string) => Promise<boolean>
  signOut: () => void
  setUser: (user: User | null) => void
  setTokens: (tokens: AccountSignInTokenRdo | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AccountSignInTokenRdo | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("owner_user")
        const storedTokens = localStorage.getItem("owner_tokens")

        if (storedUser && storedTokens) {
          setUser(JSON.parse(storedUser))
          setTokens(JSON.parse(storedTokens))
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
    localStorage.removeItem("owner_user")
    localStorage.removeItem("owner_tokens")
  }

  const updateUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem("owner_user", JSON.stringify(newUser))
    }
  }

  const updateTokens = (newTokens: AccountSignInTokenRdo | null) => {
    setTokens(newTokens)
    if (newTokens) {
      localStorage.setItem("owner_tokens", JSON.stringify(newTokens))
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
        setTokens: updateTokens
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
