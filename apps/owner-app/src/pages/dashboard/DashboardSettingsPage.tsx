import React, { useState, useEffect } from "react";
import { useUserMe, useUserMutation } from "../../hooks/user";
import { Gender } from "@beribturing/api-stub";
import { LocationPicker } from "../../components/map/LocationPicker";

export default function DashboardSettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });
  const [locationData, setLocationData] = useState<{ latitude: number; longitude: number } | undefined>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPayments: true,
    smsBookings: false,
    smsMessages: true,
    smsPayments: true,
  });

  // Fetch current user profile using custom hook
  const { userMe: userProfile, isLoading, refetch } = useUserMe();

  // Update profile mutation using custom hook
  const { mutation } = useUserMutation();
  const updateProfileMutation = mutation.modifyProfile;

  // Initialize profile data when user data is loaded
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phoneNumber || '',
        address: userProfile.address || '',
        gender: userProfile.gender || '',
      });
      setLocationData(userProfile.location || undefined);
      setPreviewUrl(userProfile.avatarUrl || '');
    }
  }, [userProfile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.name.trim()) {
      alert('Name is required');
      return;
    }

    const updateData = {
      name: profile.name,
      email: profile.email || undefined,
      address: profile.address || undefined,
      gender: profile.gender || undefined,
      ...(locationData && { location: locationData }),
      ...(profileImage && { profileImage }),
    };

    updateProfileMutation.mutate(updateData, {
      onSuccess: () => {
        alert('Profile updated successfully!');
        refetch();
      },
      onError: (error: unknown) => {
        alert('Failed to update profile. Please try again.');
        console.error('Profile update error:', error);
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm md:text-base text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Profile Information</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Click to upload profile image</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value={Gender.Male}>Male</option>
                  <option value={Gender.Female}>Female</option>
                  <option value={Gender.NonBinary}>Non-Binary</option>
                  <option value={Gender.PreferNotToSay}>Prefer Not To Say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <LocationPicker
                  initialLocation={locationData}
                  onLocationChange={setLocationData}
                />
              </div>

              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateProfileMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          )}
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
  );
}