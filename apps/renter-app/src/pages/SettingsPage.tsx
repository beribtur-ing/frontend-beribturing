import { useState, useEffect } from "react"

import { useAuth } from "../hooks"
import {
  NotificationPreferences,
  useSettings,
  useSettingsRntMutation,
} from "../hooks/user"
import {
  Bell,
  ChevronRight,
  Globe,
  Lock,
  Mail,
  Moon,
  Save,
  Shield,
  Smartphone,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("notifications")

  const {
    defaultNotificationPreferences,
    mutation: {
      updateNotificationPreferences,
      updatePrivacySettings,
      updateSecuritySettings,
      updateAppearanceSettings,
    },
  } = useSettingsRntMutation()
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(defaultNotificationPreferences)

  const { settings: apiSettings, isLoading: settingsLoading, refetchSettings } = useSettings()

  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: {
        showProfileToOtherUsers: false,
        showRentalHistory: false,
        showReviews: false,
      },
      dataAndLocation: {
        shareLocationWithLenders: false,
        allowDataCollectionForRecommendations: false,
      },
    },
    security: {
      twoFactorAuthentication: false,
      loginAlertsForNewDevices: false,
      sessionTimeoutMinutes: 30,
    },
    appearance: {
      theme: {
        darkMode: false,
        compactView: false,
      },
      defaultLanguage: "english",
    },
  })
  const [isSaving, setIsSaving] = useState(false)

  // Update notification preferences and settings when API data is loaded
  useEffect(() => {
    if (apiSettings?.notificationPreferences) {
      setNotificationPreferences(apiSettings.notificationPreferences)
    }

    if (apiSettings?.privacySettings) {
      setSettings(prev => ({
        ...prev,
        privacy: apiSettings.privacySettings,
      }))
    }

    if (apiSettings?.securitySettings) {
      setSettings(prev => ({
        ...prev,
        security: apiSettings.securitySettings,
      }))
    }

    if (apiSettings?.appearanceSettings) {
      setSettings(prev => ({
        ...prev,
        appearance: apiSettings.appearanceSettings,
      }))
    }
  }, [apiSettings?.notificationPreferences, apiSettings?.privacySettings, apiSettings?.securitySettings, apiSettings?.appearanceSettings])

  // Redirect if not authenticated
  if (!user) {
    navigate("/auth/signin")
    return null
  }

  // Show loading state while fetching settings data
  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Helper function to get nested property value
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  // Helper function to set nested property value
  const setNestedValue = (obj: any, path: string, value: any): any => {
    const keys = path.split('.')
    const lastKey = keys.pop()!
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {}
      return current[key]
    }, obj)
    target[lastKey] = value
    return obj
  }

  const handleToggle = (category: string, setting: string) => {
    if (category === "notifications") {
      setNotificationPreferences((prev) => {
        // Map UI settings to backend notification structure
        const newPrefs = { ...prev }

        switch (setting) {
          case "emailRentalReminders":
            newPrefs.emailNotifications = {
              ...prev.emailNotifications,
              rentalReminders: !prev.emailNotifications.rentalReminders,
            }
            break
          case "emailNewMessages":
            newPrefs.emailNotifications = {
              ...prev.emailNotifications,
              newMessages: !prev.emailNotifications.newMessages,
            }
            break
          case "pushRentalReminders":
            newPrefs.pushNotifications = {
              ...prev.pushNotifications,
              rentalReminders: !prev.pushNotifications.rentalReminders,
            }
            break
          case "pushNewMessages":
            newPrefs.pushNotifications = {
              ...prev.pushNotifications,
              newMessages: !prev.pushNotifications.newMessages,
            }
            break
          case "pushPromotionsAndDeals":
            newPrefs.pushNotifications = {
              ...prev.pushNotifications,
              promotionsAndDeals: !prev.pushNotifications.promotionsAndDeals,
            }
            break
          case "smsRentalReminders":
            newPrefs.smsNotifications = {
              ...prev.smsNotifications,
              rentalReminders: !prev.smsNotifications.rentalReminders,
            }
            break
          case "smsNewMessages":
            newPrefs.smsNotifications = {
              ...prev.smsNotifications,
              newMessages: !prev.smsNotifications.newMessages,
            }
            break
          case "marketingPromotionsAndDeals":
            newPrefs.marketingNotifications = {
              ...prev.marketingNotifications,
              promotionsAndDeals: !prev.marketingNotifications.promotionsAndDeals,
            }
            break
          case "marketingEmails":
            newPrefs.marketingNotifications = {
              ...prev.marketingNotifications,
              marketingEmails: !prev.marketingNotifications.marketingEmails,
            }
            break
        }

        return newPrefs
      })
    } else {
      setSettings((prev) => {
        const newSettings = JSON.parse(JSON.stringify(prev)) // Deep clone
        const currentValue = getNestedValue(newSettings[category as keyof typeof prev], setting)
        setNestedValue(newSettings[category as keyof typeof prev], setting, !currentValue)
        return newSettings
      })
    }
  }

  const handleSelectChange = (category: string, setting: string, value: string) => {
    setSettings((prev) => {
      const newSettings = JSON.parse(JSON.stringify(prev)) // Deep clone
      setNestedValue(newSettings[category as keyof typeof prev], setting, value)
      return newSettings
    })
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Save based on active tab
      if (activeTab === "notifications") {
        await updateNotificationPreferences.mutateAsync(notificationPreferences)
      } else if (activeTab === "privacy") {
        const privacySettings = {
          profileVisibility: {
            showProfileToOtherUsers: settings.privacy.profileVisibility.showProfileToOtherUsers,
            showRentalHistory: settings.privacy.profileVisibility.showRentalHistory,
            showReviews: settings.privacy.profileVisibility.showReviews,
          },
          dataAndLocation: {
            shareLocationWithLenders: true,
            allowDataCollectionForRecommendations: true,
          },
        }
        await updatePrivacySettings.mutateAsync(privacySettings)
      } else if (activeTab === "security") {
        const securitySettings = {
          twoFactorAuthentication: settings.security.twoFactorAuthentication,
          loginAlertsForNewDevices: settings.security.loginAlertsForNewDevices,
          sessionTimeoutMinutes: settings.security.sessionTimeoutMinutes,
        }
        await updateSecuritySettings.mutateAsync(securitySettings)
      } else if (activeTab === "appearance") {
        const appearanceSettings = {
          darkMode: settings.appearance.theme.darkMode,
          compactView: settings.appearance.theme.compactView,
          language: settings.appearance.defaultLanguage,
        }
        await updateAppearanceSettings.mutateAsync(appearanceSettings)
      }
      refetchSettings();
      // Show success message or toast here
    } catch (error) {
      console.error(`Failed to update ${activeTab} settings:`, error)
      // Show error message or toast here
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Globe },
  ]

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
              <span className="text-gray-900">Settings</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Tabs - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="h-5 w-5"/>
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4"/>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-500"/>
                            <span>Rental Reminders</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "emailRentalReminders")}>
                            {notificationPreferences.emailNotifications.rentalReminders ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-500"/>
                            <span>New Messages</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "emailNewMessages")}>
                            {notificationPreferences.emailNotifications.newMessages ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500"/>
                            <span>Rental Reminders</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "pushRentalReminders")}>
                            {notificationPreferences.pushNotifications.rentalReminders ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500"/>
                            <span>New Messages</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "pushNewMessages")}>
                            {notificationPreferences.pushNotifications.newMessages ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500"/>
                            <span>Promotions and Deals</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "pushPromotionsAndDeals")}>
                            {notificationPreferences.pushNotifications.promotionsAndDeals ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-gray-500"/>
                            <span>Rental Reminders</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "smsRentalReminders")}>
                            {notificationPreferences.smsNotifications.rentalReminders ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-gray-500"/>
                            <span>New Messages</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "smsNewMessages")}>
                            {notificationPreferences.smsNotifications.newMessages ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Marketing Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500"/>
                            <span>Promotions and Deals</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "marketingPromotionsAndDeals")}>
                            {notificationPreferences.marketingNotifications.promotionsAndDeals ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-500"/>
                            <span>Marketing Emails</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "marketingEmails")}>
                            {notificationPreferences.marketingNotifications.marketingEmails ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Show my profile to other users</span>
                          <button onClick={() => handleToggle("privacy", "profileVisibility.showProfileToOtherUsers")}>
                            {settings.privacy.profileVisibility.showProfileToOtherUsers ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Show my rental history</span>
                          <button onClick={() => handleToggle("privacy", "profileVisibility.showRentalHistory")}>
                            {settings.privacy.profileVisibility.showRentalHistory ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Show my reviews</span>
                          <button onClick={() => handleToggle("privacy", "profileVisibility.showReviews")}>
                            {settings.privacy.profileVisibility.showReviews ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Data and Location</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Share my location with lenders</span>
                          <button onClick={() => handleToggle("privacy", "dataAndLocation.shareLocationWithLenders")}>
                            {settings.privacy.dataAndLocation.shareLocationWithLenders ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Allow data collection for better recommendations</span>
                          <button
                            onClick={() => handleToggle("privacy", "dataAndLocation.allowDataCollectionForRecommendations")}>
                            {settings.privacy.dataAndLocation.allowDataCollectionForRecommendations ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Account Security</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Two-Factor Authentication</span>
                          <button onClick={() => handleToggle("security", "twoFactorAuthentication")}>
                            {settings.security.twoFactorAuthentication ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Login alerts for new devices</span>
                          <button onClick={() => handleToggle("security", "loginAlertsForNewDevices")}>
                            {settings.security.loginAlertsForNewDevices ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Session Timeout</span>
                          <select
                            value={settings.security.sessionTimeoutMinutes}
                            onChange={(e) => handleSelectChange("security", "sessionTimeoutMinutes", e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Password</h3>
                      <div className="space-y-3">
                        <button
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Theme</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Moon className="h-5 w-5 text-gray-500"/>
                            <span>Dark Mode</span>
                          </div>
                          <button onClick={() => handleToggle("appearance", "theme.darkMode")}>
                            {settings.appearance.theme.darkMode ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Compact View</span>
                          <button onClick={() => handleToggle("appearance", "theme.compactView")}>
                            {settings.appearance.theme.compactView ? (
                              <ToggleRight className="h-6 w-6 text-purple-600"/>
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400"/>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Language</h3>
                      <div className="space-y-3">
                        <select
                          value={settings.appearance.defaultLanguage}
                          onChange={(e) => handleSelectChange("appearance", "defaultLanguage", e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="english">English</option>
                          <option value="russian">Русский</option>
                          <option value="uzbek">O'zbekcha</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4"/>
                      <span>Save Settings</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}