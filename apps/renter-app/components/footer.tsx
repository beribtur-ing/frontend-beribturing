"use client"

import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("beribturing");
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">renthub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              {t("yourTrustedPlatformForRentingItems")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t("quickLinks")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t("support")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("safety")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t("legal")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-purple-600">
                  {t("cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
