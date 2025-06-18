"use client"
import type React from "react"
import {useState} from "react"

import {useAuth} from "@/hooks"
import {AlertCircle, Check, ChevronDown, ChevronUp, CreditCard, Lock, Plus, Trash2, X} from "lucide-react"
import {useRouter} from "@/i18n/navigation"

// Mock payment methods
const mockPaymentMethods = [
  {
    id: "card-1",
    type: "credit",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
    billingAddress: {
      name: "Sarah Johnson",
      line1: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
  },
  {
    id: "card-2",
    type: "credit",
    brand: "Mastercard",
    last4: "5678",
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
    billingAddress: {
      name: "Sarah Johnson",
      line1: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
  },
]

export default function PaymentsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [expandedAddresses, setExpandedAddresses] = useState<string[]>([])
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    billingName: "",
    billingLine1: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "US",
    saveAddress: true,
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const toggleAddressExpand = (cardId: string) => {
    setExpandedAddresses((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === cardId,
      })),
    )
  }

  const handleDeleteCard = (cardId: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== cardId))
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add new card to the list
    const newPaymentMethod = {
      id: `card-${Date.now()}`,
      type: "credit",
      brand: newCard.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
      last4: newCard.cardNumber.slice(-4),
      expMonth: Number.parseInt(newCard.expMonth),
      expYear: Number.parseInt(newCard.expYear),
      isDefault: paymentMethods.length === 0,
      billingAddress: {
        name: newCard.billingName,
        line1: newCard.billingLine1,
        city: newCard.billingCity,
        state: newCard.billingState,
        postalCode: newCard.billingPostalCode,
        country: newCard.billingCountry,
      },
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setIsAddingCard(false)
    setIsProcessing(false)
    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      billingName: "",
      billingLine1: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "US",
      saveAddress: true,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setNewCard((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <a href="/" className="hover:text-purple-600">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Payment Methods</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Methods</h1>
          {!isAddingCard && (
            <button
              onClick={() => setIsAddingCard(true)}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Payment Method</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods List */}
          <div className={`lg:col-span-${isAddingCard ? "1" : "3"}`}>
            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No payment methods</h2>
                <p className="text-gray-600 mb-6">Add a payment method to start renting items</p>
                <button
                  onClick={() => setIsAddingCard(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Payment Method
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-white rounded-xl shadow-sm p-5 border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                          {method.brand === "Visa" ? (
                            <span className="text-blue-700 font-bold text-sm">VISA</span>
                          ) : (
                            <span className="text-red-600 font-bold text-sm">MC</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">
                              {method.brand} •••• {method.last4}
                            </h3>
                            {method.isDefault && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-sm text-purple-600 hover:text-purple-700"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCard(method.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="mt-4">
                      <button
                        onClick={() => toggleAddressExpand(method.id)}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>Billing Address</span>
                        {expandedAddresses.includes(method.id) ? (
                          <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </button>

                      {expandedAddresses.includes(method.id) && (
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p>{method.billingAddress.name}</p>
                          <p>{method.billingAddress.line1}</p>
                          <p>
                            {method.billingAddress.city}, {method.billingAddress.state}{" "}
                            {method.billingAddress.postalCode}
                          </p>
                          <p>{method.billingAddress.country}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Payment Method Form */}
          {isAddingCard && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Add Payment Method</h2>
                  <button onClick={() => setIsAddingCard(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleAddCard} className="space-y-6">
                  {/* Card Details */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Card Information</h3>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          required
                          value={newCard.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value.replace(/[^\d]/g, "").slice(0, 16))
                            setNewCard((prev) => ({ ...prev, cardNumber: formatted }))
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="absolute right-3 top-2.5">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          id="cardHolder"
                          name="cardHolder"
                          type="text"
                          required
                          value={newCard.cardHolder}
                          onChange={handleInputChange}
                          placeholder="Name on card"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 mb-1">
                            Month
                          </label>
                          <select
                            id="expMonth"
                            name="expMonth"
                            required
                            value={newCard.expMonth}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <option key={month} value={month.toString().padStart(2, "0")}>
                                {month.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                          </label>
                          <select
                            id="expYear"
                            name="expYear"
                            required
                            value={newCard.expYear}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-span-1">
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            required
                            value={newCard.cvv}
                            onChange={(e) => {
                              const cvv = e.target.value.replace(/[^\d]/g, "").slice(0, 4)
                              setNewCard((prev) => ({ ...prev, cvv }))
                            }}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900">Billing Address</h3>

                    <div>
                      <label htmlFor="billingName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="billingName"
                        name="billingName"
                        type="text"
                        required
                        value={newCard.billingName}
                        onChange={handleInputChange}
                        placeholder="Name on billing address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="billingLine1" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        id="billingLine1"
                        name="billingLine1"
                        type="text"
                        required
                        value={newCard.billingLine1}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          id="billingCity"
                          name="billingCity"
                          type="text"
                          required
                          value={newCard.billingCity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          id="billingState"
                          name="billingState"
                          type="text"
                          required
                          value={newCard.billingState}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          id="billingPostalCode"
                          name="billingPostalCode"
                          type="text"
                          required
                          value={newCard.billingPostalCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="billingCountry"
                          name="billingCountry"
                          required
                          value={newCard.billingCountry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="saveAddress"
                        name="saveAddress"
                        type="checkbox"
                        checked={newCard.saveAddress}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="saveAddress" className="ml-2 block text-sm text-gray-900">
                        Save this address for future payments
                      </label>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Secure Payment Processing</p>
                      <p>
                        Your card information is encrypted and securely processed. We never store your full card
                        details.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Add Card</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
