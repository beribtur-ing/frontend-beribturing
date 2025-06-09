"use client"
import type React from "react"
import {useState} from "react"

import {ArrowLeft, Phone} from "lucide-react"
import { Link } from "@/i18n/navigation"
import {useRouter} from "@/i18n/navigation"

export default function PhoneSignInPage() {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "")

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return phoneNumber
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to OTP verification page with phone number
      router.push(`/auth/verify-otp?phone=${encodeURIComponent(phone)}&type=signin`)
    }, 1500)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
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

        <h2 className="text-center text-3xl font-bold text-gray-900">Sign in with Phone</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your phone number and we'll send you a verification code
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1 relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="(555) 123-4567"
                  maxLength={14}
                />
                <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <p className="mt-1 text-xs text-gray-500">We'll send a 6-digit verification code to this number</p>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || phone.length < 14}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending code...
                  </div>
                ) : (
                  "Send verification code"
                )}
              </button>
            </div>
          </form>

          {/* Alternative sign in */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Prefer to use password?{" "}
              <Link href="/auth/signin" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in with password
              </Link>
            </p>
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
