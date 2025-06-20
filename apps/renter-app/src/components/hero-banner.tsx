import { useTranslation } from "react-i18next"

export function HeroBanner() {
  const { t } = useTranslation();
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/placeholder.svg?height=600&width=1200')`,
      }}
    >
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("rentEverythingYouNeed")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
            {t("fromToolsToElectronics")}
          </p>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
    </section>
  )
}
