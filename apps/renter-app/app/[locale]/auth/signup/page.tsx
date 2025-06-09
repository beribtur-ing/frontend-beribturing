"use client"
import type React from "react"
import {useState} from "react"

import {ArrowLeft, Check, Eye, EyeOff, Lock, Mail, Phone, User} from "lucide-react"
import { Link } from "@/i18n/navigation"
import {useRouter} from "@/i18n/navigation"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "renter",
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
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

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to OTP verification page with phone number
      router.push(`/auth/verify-otp?phone=${encodeURIComponent(formData.phone)}&type=signup`)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === "phone") {
      const formatted = formatPhoneNumber(value)
      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
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

        <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Join thousands of people renting and lending items</p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    formData.userType === "renter" ? "border-purple-600 bg-purple-50" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="renter"
                    checked={formData.userType === "renter"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center text-center">
                    <div className="text-2xl mb-2">🛍️</div>
                    <div className="text-sm font-medium">Rent items</div>
                  </div>
                  {formData.userType === "renter" && (
                    <Check className="h-5 w-5 text-purple-600 absolute top-2 right-2" />
                  )}
                </label>

                <label
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    formData.userType === "lender" ? "border-purple-600 bg-purple-50" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="lender"
                    checked={formData.userType === "lender"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm font-medium">Lend & earn</div>
                  </div>
                  {formData.userType === "lender" && (
                    <Check className="h-5 w-5 text-purple-600 absolute top-2 right-2" />
                  )}
                </label>
              </div>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="First name"
                  />
                  <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            {/* Phone - Primary field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="(555) 123-4567"
                  maxLength={14}
                />
                <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <p className="mt-1 text-xs text-gray-500">We'll send a verification code to this number</p>
            </div>

            {/* Email - Optional */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your email (optional)"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Create a password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{getPasswordStrengthText()}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Use 8+ characters with uppercase, lowercase, numbers & symbols
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Confirm your password"
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
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="agreeToMarketing"
                  name="agreeToMarketing"
                  type="checkbox"
                  checked={formData.agreeToMarketing}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToMarketing" className="ml-2 block text-sm text-gray-900">
                  I'd like to receive SMS notifications about bookings and promotions
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.agreeToTerms ||
                  formData.password !== formData.confirmPassword ||
                  formData.phone.length < 14
                }
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
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
