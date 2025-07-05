import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserMe, useUserMutation } from "../../hooks/user";
import { Gender } from "@beribturing/api-stub";
import { Map } from "../../components/map/Map";
import { ChangePasswordModal } from "../../components/modals";
import { useToast } from '~/hooks';

interface ProfileFormData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
}

interface NotificationFormData {
  emailBookings: boolean;
  emailMessages: boolean;
  emailPayments: boolean;
  smsBookings: boolean;
  smsMessages: boolean;
  smsPayments: boolean;
}

const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email format").optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  gender: yup.string().optional(),
});

const notificationSchema = yup.object().shape({
  emailBookings: yup.boolean().default(false),
  emailMessages: yup.boolean().default(false),
  emailPayments: yup.boolean().default(false),
  smsBookings: yup.boolean().default(false),
  smsMessages: yup.boolean().default(false),
  smsPayments: yup.boolean().default(false),
});

export default function DashboardSettingsPage() {
  const { showToast } = useToast();
  const [locationData, setLocationData] = useState<{ latitude: number; longitude: number } | undefined>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
    },
  });

  const notificationForm = useForm<NotificationFormData>({
    resolver: yupResolver(notificationSchema),
    defaultValues: {
      emailBookings: true,
      emailMessages: true,
      emailPayments: true,
      smsBookings: false,
      smsMessages: true,
      smsPayments: true,
    },
  });

  // Fetch current user profile using custom hook
  const { userMe: userProfile, isLoading, refetch } = useUserMe();

  // Update profile mutation using custom hook
  const { mutation } = useUserMutation();
  const updateProfileMutation = mutation.modifyProfile;
  const updateNotificationMutation = mutation.updateNotificationPreferences;

  // Initialize profile data when user data is loaded
  useEffect(() => {
    if (userProfile) {
      profileForm.reset({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phoneNumber || '',
        address: userProfile.address || '',
        gender: userProfile.gender || '',
      });
      setLocationData(userProfile.location || { latitude: '41.32', longitude: '69.24' });
      setPreviewUrl(userProfile.avatarUrl || '');

      // Initialize notification preferences from backend data
      if (userProfile.notificationPreferences) {
        const prefs = userProfile.notificationPreferences;
        notificationForm.reset({
          emailBookings: prefs.emailNotifications?.newBookingsAndReservations || false,
          emailMessages: prefs.emailNotifications?.messagesFromCustomers || false,
          emailPayments: prefs.emailNotifications?.paymentConfirmations || false,
          smsBookings: prefs.smsNotifications?.newBookingsAndReservations || false,
          smsMessages: prefs.smsNotifications?.messagesFromCustomers || false,
          smsPayments: prefs.smsNotifications?.paymentConfirmations || false,
        });
      }
    }
  }, [userProfile, profileForm, notificationForm]);

  const handleProfileSubmit = (data: ProfileFormData) => {
    console.log(locationData)
    const updateData = {
      name: data.name,
      email: data.email || undefined,
      address: data.address || undefined,
      gender: data.gender || undefined,
      ...(locationData && { location: locationData }),
      ...(profileImage && { image: profileImage }),
    };
    console.log(updateData)
    updateProfileMutation.mutate(updateData, {
      onSuccess: () => {
        showToast('Profile updated successfully!', 'success');
        refetch();
      },
      onError: (error: unknown) => {
        showToast('Failed to update profile. Please try again.', 'error');
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

  const handleNotificationSubmit = (data: NotificationFormData) => {
    const notificationData = {
      emailNotifications: {
        newBookingsAndReservations: data.emailBookings,
        messagesFromCustomers: data.emailMessages,
        paymentConfirmations: data.emailPayments,
      },
      smsNotifications: {
        newBookingsAndReservations: data.smsBookings,
        messagesFromCustomers: data.smsMessages,
        paymentConfirmations: data.smsPayments,
      },
    };

    updateNotificationMutation.mutate(notificationData, {
      onSuccess: () => {
        showToast('Notification preferences updated successfully!', 'success');
      },
      onError: (error: unknown) => {
        showToast('Failed to update notification preferences. Please try again.', 'error');
        console.error('Notification update error:', error);
      },
    });
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
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
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
                <Controller
                  name="name"
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          fieldState.error ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Controller
                  name="email"
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          fieldState.error ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <Controller
                  name="gender"
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          fieldState.error ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value={Gender.Male}>Male</option>
                        <option value={Gender.Female}>Female</option>
                        <option value={Gender.NonBinary}>Non-Binary</option>
                        <option value={Gender.PreferNotToSay}>Prefer Not To Say</option>
                      </select>
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <Controller
                  name="address"
                  control={profileForm.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        placeholder="Your address"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          fieldState.error ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldState.error && (
                        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  {locationData?.latitude && locationData?.longitude && (<Map
                    coords={locationData ? `${locationData.latitude},${locationData.longitude}` : '0,0'}
                    height="300"
                    onLocationClick={(coords) => {
                      const [lat, lng] = coords.split(',').map(Number);
                      console.log(`Selected coordinates: ${lat}, ${lng}`);
                      setLocationData({ latitude: lat, longitude: lng });
                    }}
                  />)}
                </div>
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
                  <Controller
                    key={key}
                    name={key as keyof NotificationFormData}
                    control={notificationForm.control}
                    render={({ field }) => (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    )}
                  />
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
                  <Controller
                    key={key}
                    name={key as keyof NotificationFormData}
                    control={notificationForm.control}
                    render={({ field }) => (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="mt-6">
            <button
              type="submit"
              disabled={updateNotificationMutation.isPending}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateNotificationMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </span>
              ) : (
                'Save Notification Preferences'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-3 py-2 text-xs md:text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700">
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

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={() => {
          // Optionally refresh user data or show additional success message
        }}
      />
    </div>
  );
}
