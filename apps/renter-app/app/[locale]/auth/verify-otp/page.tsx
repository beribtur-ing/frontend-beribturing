"use client"
import type React from "react"
import {useEffect, useRef, useState} from "react"

import {ArrowLeft, Check, Phone, RefreshCw} from "lucide-react"
import { Link } from "@/i18n/navigation"
import {useRouter} from "@/i18n/navigation"
import {useSearchParams} from "next/navigation"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  const phone = searchParams.get("phone") || ""
  const type = searchParams.get("type") || "signin" // signin or signup

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOtp(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if (pastedData.length === 6) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)
      setError("")
      handleVerifyOtp(pastedData)
    }
  }

  const handleVerifyOtp = async (otpCode: string) => {
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Simulate success/failure
      if (otpCode === "123456") {
        setIsVerified(true)
        setTimeout(() => {
          router.push("/") // Redirect to dashboard or home
        }, 2000)
      } else {
        setError("Invalid verification code. Please try again.")
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    }, 1500)
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      setTimeLeft(60)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      handleVerifyOtp(otpCode)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">renthub</span>
          </Link>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Phone Verified!</h2>
            <p className="text-gray-600 mb-8">
              {type === "signup"
                ? "Your account has been created successfully. Welcome to RentHub!"
                : "You've been signed in successfully. Welcome back!"}
            </p>
            <div className="animate-pulse text-sm text-gray-500">Redirecting you to the platform...</div>
          </div>
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

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify your phone</h2>
          <p className="mt-2 text-sm text-gray-600">We've sent a 6-digit verification code to</p>
          <p className="font-medium text-gray-900">{phone}</p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      error ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || otp.some((digit) => digit === "")}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </button>
            </div>
          </form>

          {/* Resend code */}
          <div className="mt-6 text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Didn't receive the code? <span className="text-gray-400">Resend in {timeLeft}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-sm font-medium text-purple-600 hover:text-purple-500 disabled:opacity-50 flex items-center justify-center mx-auto"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend verification code"
                )}
              </button>
            )}
          </div>

          {/* Change phone number */}
          <div className="mt-4 text-center">
            <Link
              href={type === "signup" ? "/auth/signup" : "/auth/phone-signin"}
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              Wrong phone number? Change it
            </Link>
          </div>
        </div>
      </div>

      {/* Back to home */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to RentHub
        </Link>
      </div>
    </div>
  )
}
