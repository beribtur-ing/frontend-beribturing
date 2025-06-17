"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { usePasswordReset } from "@/hooks/auth"

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  
  const { resetPassword, sendResetPasswordOtp, isResettingPassword, isSendingResetOtp } = usePasswordReset()
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get('phone') || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || !newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!phoneNumber) {
      setError("Phone number not found. Please start over.")
      return
    }

    const success = await resetPassword(phoneNumber, newPassword, otp)

    if (success) {
      router.push('/login?message=Password reset successfully')
    } else {
      setError("Invalid OTP or password reset failed. Please try again.")
    }
  }

  const handleResendOtp = async () => {
    if (!phoneNumber) return
    
    const success = await sendResetPasswordOtp(phoneNumber)
    if (success) {
      setError("")
      // You could show a success message here
    } else {
      setError("Failed to resend OTP")
    }
  }

  if (!phoneNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invalid Access</h2>
          <p className="text-gray-600 mb-4">Please start the password reset process again.</p>
          <a 
            href="/auth/forgot-password" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Reset Password
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 md:space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
            Reset your password
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
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password *
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-xs md:text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isResettingPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isResettingPassword ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSendingResetOtp}
                className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                {isSendingResetOtp ? "Sending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}