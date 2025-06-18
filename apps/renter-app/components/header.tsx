"use client"
import {useEffect, useRef, useState} from "react"
import {ChevronDown, Heart, LogOut, Menu, Search, Settings, User, UserCircle, X} from "lucide-react"
import {CatalogMenu} from "./catalog-menu"
import {useAuth} from "@/hooks"
import { Link } from "@/i18n/navigation"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslations } from "next-intl"

export function Header() {
  const t = useTranslations("beribturing");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()

  // Close catalog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isCatalogOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCatalogOpen, isUserMenuOpen])

  const handleSignOut = () => {
    signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <>
      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -ml-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">renthub</span>
            </Link>

            {/* Desktop Catalog Button */}
            <div className="hidden lg:block relative" ref={catalogRef}>
              <button
                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  isCatalogOpen ? "border-purple-500 bg-purple-50 text-purple-600" : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Menu className="h-4 w-4" />
                <span>{t("catalog")}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCatalogOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Desktop Catalog Dropdown */}
              {isCatalogOpen && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <CatalogMenu onClose={() => setIsCatalogOpen(false)} />
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('searchRentalItems')}
                  className="w-full h-10 lg:h-12 pl-4 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base"
                />
                <button className="absolute right-1 top-1 h-8 lg:h-10 px-3 lg:px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden p-2">
              <Search className="h-5 w-5" />
            </button>

            {/* User Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />

              {user ? (
                // Authenticated user menu
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCircle className="h-4 w-4" />
                          <span>{t("profile")}</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>{t("settings")}</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t("signOut")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Non-authenticated user actions
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{t("signIn")}</span>
                </Link>
              )}

              <a
                href="/favorites"
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Heart className="h-4 w-4" />
                <span>{t("favorites")}</span>
              </a>
            </div>

            {/* Mobile User Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <LanguageSwitcher />
              {user ? (
                <Link href="/profile" className="p-2">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link href="/auth/signin" className="p-2">
                  <User className="h-5 w-5" />
                </Link>
              )}
              <a href="/favorites" className="p-2">
                <Heart className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items to rent..."
                className="w-full h-10 pl-4 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-1 top-1 h-8 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white relative z-50">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="border-b pb-4">
                <CatalogMenu onClose={() => setIsMobileMenuOpen(false)} isMobile={true} />
              </div>

              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 w-full text-left py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>{t("profile")}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full text-left py-2 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t("signOut")}</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 w-full text-left py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>{t("signIn")}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
