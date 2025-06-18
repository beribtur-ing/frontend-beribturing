"use client"
import type React from "react"
import {useState} from "react"

import {ArrowLeft, Eye, EyeOff, Lock} from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useRouter } from "@/i18n/navigation"
import {useSearchParams} from "next/navigation"
import {useOtpAuth} from "@/hooks/auth"

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  
  const { sendOtp, isSendingOtp } = useOtpAuth()
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ""

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    let phoneNumber = value.replace(/\D/g, "")
    
    // Auto-add country code if not present
    if (phoneNumber.length > 0 && !phoneNumber.startsWith('998')) {
      phoneNumber = '998' + phoneNumber
    }

    // Format as +998 XX XXX-XX-XX
    if (phoneNumber.length >= 12) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`
    } else if (phoneNumber.length >= 8) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`
    } else if (phoneNumber.length >= 5) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5)}`
    } else if (phoneNumber.length >= 3) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
    } else {
      return phoneNumber ? `+${phoneNumber}` : ""
    }
  }

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

    if (!phone) {
      setError("Phone number not found. Please start over.")
      return
    }

    setIsResettingPassword(true)
    
    try {
      // Clean phone number for API (remove +, spaces, and hyphens)
      const cleanPhone = phone.replace(/[\s\-+]/g, '')
      
      // For now, we'll simulate password reset
      // In a real app, you'd call a password reset API with cleanPhone, newPassword, and otp
      console.log('Password reset for:', cleanPhone, 'with OTP:', otp, 'and new password:', newPassword)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      router.push('/auth/signin?message=Password reset successfully')
    } catch (error) {
      setError("Password reset failed. Please try again.")
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleResendOtp = async () => {
    if (!phone) return
    
    // Clean phone number for API (remove +, spaces, and hyphens)
    const cleanPhone = phone.replace(/[\s\-+]/g, '')
    
    const success = await sendOtp(cleanPhone, 'renter')
    if (success) {
      setError("")
      // You could show a success message here
    } else {
      setError("Failed to resend OTP")
    }
  }

  if (!phone) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">renthub</span>
          </Link>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invalid Access</h2>
          <p className="text-gray-600 mb-4">Please start the password reset process again.</p>
          <Link 
            href="/auth/forgot-password" 
            className="text-purple-600 hover:text-purple-500 font-medium"
          >
            Reset Password
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">renthub</span>
        </Link>

        <h2 className="text-center text-3xl font-bold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the verification code sent to {formatPhoneNumber(phone)}
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* OTP */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-center text-lg tracking-widest"
                  placeholder="123456"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm new password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Confirm new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isResettingPassword}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResettingPassword ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting password...
                  </div>
                ) : (
                  "Reset password"
                )}
              </button>
            </div>
          </form>

          {/* Resend code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSendingOtp}
                className="font-medium text-purple-600 hover:text-purple-500 disabled:opacity-50"
              >
                {isSendingOtp ? "Sending..." : "Resend code"}
              </button>
            </p>
          </div>

          {/* Back to sign in */}
          <div className="mt-4 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}