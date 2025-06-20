import type React from "react"

import { useAuthContext } from "../../lib/auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
