"use client"
import {useState} from "react"

import {useAuth} from "@/hooks"
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
import {useRouter} from "@/i18n/navigation"
import {FancyDarkModeToggle} from "@/components/fancy-dark-mode-toggle"
import {useTranslations} from "next-intl"

export default function SettingsPage() {
  const t = useTranslations("beribturing")  
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("notifications")
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
      rentalReminders: true,
      newMessages: true,
      promotions: false,
    },
    privacy: {
      showProfile: true,
      showRentals: true,
      showReviews: true,
      locationSharing: false,
      dataCollection: true,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: "30",
    },
    appearance: {
      darkMode: false,
      compactView: false,
      language: "english",
    },
  })
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const handleToggle = (category: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as any],
      },
    }))
  }

  const handleSelectChange = (category: string, setting: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message or toast here
  }

  const tabs = [
    { id: "notifications", label: t("notifications"), icon: Bell },
    { id: "privacy", label: t("privacy"), icon: Shield },
    { id: "security", label: t("security"), icon: Lock },
    { id: "appearance", label: t("appearance"), icon: Globe },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{t("accountSettings")}</h1>

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
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
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
                  <h2 className="text-xl font-semibold mb-6">{t("notificationPreferences")}</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("notificationChannels")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <span>{t("emailNotifications")}</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "email")}>
                            {settings.notifications.email ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500" />
                            <span>{t("pushNotifications")}</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "push")}>
                            {settings.notifications.push ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-gray-500" />
                            <span>{t("smsNotifications")}</span>
                          </div>
                          <button onClick={() => handleToggle("notifications", "sms")}>
                            {settings.notifications.sms ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("notificationTypes")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>{t("rentalReminders")}</span>
                          <button onClick={() => handleToggle("notifications", "rentalReminders")}>
                            {settings.notifications.rentalReminders ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("newMessages")}</span>
                          <button onClick={() => handleToggle("notifications", "newMessages")}>
                            {settings.notifications.newMessages ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("promotionsAndDeals")}</span>
                          <button onClick={() => handleToggle("notifications", "promotions")}>
                            {settings.notifications.promotions ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("marketingEmails")}</span>
                          <button onClick={() => handleToggle("notifications", "marketing")}>
                            {settings.notifications.marketing ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
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
                  <h2 className="text-xl font-semibold mb-6">{t("privacySettings")}</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("profileVisibility")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>{t("showMyProfileToOtherUsers")}</span>
                          <button onClick={() => handleToggle("privacy", "showProfile")}>
                            {settings.privacy.showProfile ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("showMyRentalHistory")}</span>
                          <button onClick={() => handleToggle("privacy", "showRentals")}>
                            {settings.privacy.showRentals ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("showMyReviews")}</span>
                          <button onClick={() => handleToggle("privacy", "showReviews")}>
                            {settings.privacy.showReviews ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("dataAndLocation")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>{t("shareMyLocationWithLenders")}</span>
                          <button onClick={() => handleToggle("privacy", "locationSharing")}>
                            {settings.privacy.locationSharing ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("allowDataCollectionForBetterRecommendations")}</span>
                          <button onClick={() => handleToggle("privacy", "dataCollection")}>
                            {settings.privacy.dataCollection ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
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
                  <h2 className="text-xl font-semibold mb-6">{t("securitySettings")}</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("accountSecurity")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>{t("twoFactorAuthentication")}</span>
                          <button onClick={() => handleToggle("security", "twoFactorAuth")}>
                            {settings.security.twoFactorAuth ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("loginAlertsForNewDevices")}</span>
                          <button onClick={() => handleToggle("security", "loginAlerts")}>
                            {settings.security.loginAlerts ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("sessionTimeout")}</span>
                          <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleSelectChange("security", "sessionTimeout", e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="15">15 {t('minutes')}</option>
                            <option value="30">30 {t('minutes')}</option>
                            <option value="60">60 {t('minutes')}</option>
                            <option value="120">2 {t('hours')}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("password")}</h3>
                      <div className="space-y-3">
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm">
                          {t("changePassword")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">{t("appearanceSettings")}</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("theme")}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Moon className="h-5 w-5 text-gray-500" />
                            <span>{t("darkMode")}</span>
                          </div>
                          <FancyDarkModeToggle />
                        </div>

                        <div className="flex items-center justify-between">
                          <span>{t("compactView")}</span>
                          <button onClick={() => handleToggle("appearance", "compactView")}>
                            {settings.appearance.compactView ? (
                              <ToggleRight className="h-6 w-6 text-purple-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t("language")}</h3>
                      <div className="space-y-3">
                        <select
                          value={settings.appearance.language}
                          onChange={(e) => handleSelectChange("appearance", "language", e.target.value)}
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
                      <span>{t("saving")}...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{t("saveSettings")}</span>
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
