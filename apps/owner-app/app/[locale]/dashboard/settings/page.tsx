"use client"

import type React from "react"

import { useState } from "react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    businessName: "John's Rentals",
    taxId: "12-3456789",
  })

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPayments: true,
    smsBookings: false,
    smsMessages: true,
    smsPayments: true,
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", profile)
    // Implement profile update
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm md:text-base text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) => setProfile((prev) => ({ ...prev, businessName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Email Notifications</h3>
              <div className="space-y-2">
                {[
                  { key: "emailBookings", label: "New bookings and reservations" },
                  { key: "emailMessages", label: "Messages from customers" },
                  { key: "emailPayments", label: "Payment confirmations" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">SMS Notifications</h3>
              <div className="space-y-2">
                {[
                  { key: "smsBookings", label: "New bookings and reservations" },
                  { key: "smsMessages", label: "Messages from customers" },
                  { key: "smsPayments", label: "Payment confirmations" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-3 py-2 text-xs md:text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Change Password
          </button>
          <button className="px-3 py-2 text-xs md:text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
            Export Data
          </button>
          <button className="px-3 py-2 text-xs md:text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
