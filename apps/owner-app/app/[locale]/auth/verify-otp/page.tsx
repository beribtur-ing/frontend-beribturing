"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOtpAuth } from "@/hooks/auth"
import { LenderType, Profile } from '@beribturing/api-stub'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [signupData, setSignupData] = useState<any>(null)
  
  const { verifyOtpAndSignUp, sendOtp, isVerifyingOtp, isSendingOtp } = useOtpAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get('phone') || ""

  useEffect(() => {
    // Get signup data from sessionStorage
    const storedData = sessionStorage.getItem('signupData')
    if (storedData) {
      setSignupData(JSON.parse(storedData))
    } else {
      // Redirect back to signup if no data
      router.push('/auth/signup')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!signupData) {
      setError("Signup data not found. Please start over.")
      return
    }

    // Create profile object
    const profile: Profile = {
      email: signupData.email,
      phoneNumber: signupData.phoneNumber,
      name: signupData.name
    }

    const success = await verifyOtpAndSignUp(
      phoneNumber,
      otp,
      password,
      signupData.name,
      profile,
      signupData.lenderType as LenderType
    )

    if (success) {
      // Clear stored data
      sessionStorage.removeItem('signupData')
      router.push('/login?message=Account created successfully')
    } else {
      setError("Invalid OTP or registration failed. Please try again.")
    }
  }

  const handleResendOtp = async () => {
    if (!phoneNumber) return
    
    const success = await sendOtp(phoneNumber)
    if (success) {
      setError("")
      // You could show a success message here
    } else {
      setError("Failed to resend OTP")
    }
  }

  if (!signupData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 md:space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
            Verify your phone number
          </h2>
          <p className="mt-2 text-center text-xs md:text-sm text-gray-600">
            Enter the OTP sent to {phoneNumber}
          </p>
        </div>
        <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code *
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest"
                placeholder="123456"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-xs md:text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isVerifyingOtp}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isVerifyingOtp ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSendingOtp}
                className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                {isSendingOtp ? "Sending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}