import type React from "react"
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Calendar, Camera, Edit3, Heart, Mail, MapPin, Package, Phone, Save, Settings, Star, User, X} from "lucide-react" // Import Settings icon
import {useAuth} from "../hooks"

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const navigate = useNavigate()

  // Redirect if not authenticated
  if (!user) {
    navigate("/auth/signin")
    return null
  }

  const handleEditStart = () => {
    setEditForm({
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
      email: user.profile?.email,
      phone: user.phoneNumber,
      address: user.profile?.address,
      city: user.profile?.city,
      state: user.profile?.state,
      zipCode: user.profile?.zipCode,
    })
    setIsEditing(true)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    })
  }

  const handleEditSave = async () => {
    const success = await updateProfile({
      ...user,
      phoneNumber: editForm.phone,
      profile: {
        ...user.profile,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        address: editForm.address,
        city: editForm.city,
        state: editForm.state,
        zipCode: editForm.zipCode,
      },
    })

    if (success) {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const stats = [
    { label: "Rentals", value: "12", icon: Package },
    { label: "Reviews", value: "4.9", icon: Star },
    { label: "Member Since", value: "2023", icon: Calendar },
    { label: "Favorites", value: "8", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Link to="/" className="hover:text-purple-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Profile</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user.profile?.profilePictureUrl || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {user.profile?.firstName} {user.profile?.lastName}
              </h1>
              <p className="text-gray-600 mb-4">Member Since {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}</p>

              <div className="flex items-center justify-center space-x-1 mb-6">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-gray-600">(24 Reviews)</span>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  List an Item
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
                  View Public Profile
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEditStart}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditSave}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phoneNumber}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={editForm.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={editForm.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.state}</p>
                  )}
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={editForm.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.profile?.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium">Favorites</div>
                    <div className="text-sm text-gray-600">View saved items</div>
                  </div>
                </Link>

                <Link
                  to="/rentals"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">My Rentals</div>
                    <div className="text-sm text-gray-600">Active and past rentals</div>
                  </div>
                </Link>

                <Link
                  to="/payments"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Payment Methods</div>
                    <div className="text-sm text-gray-600">Manage payment options</div>
                  </div>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Settings</div>
                    <div className="text-sm text-gray-600">Account preferences</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}