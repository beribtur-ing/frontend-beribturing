import React, { createContext, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SUPPORTED_LOCALES = ['en', 'ru', 'uz'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

interface LocaleContextType {
  locale: SupportedLocale;
  changeLocale: (newLocale: SupportedLocale) => void;
  getLocalizedPath: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale: routeLocale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  // Validate and get current locale
  const currentLocale: SupportedLocale = SUPPORTED_LOCALES.includes(routeLocale as SupportedLocale) 
    ? (routeLocale as SupportedLocale) 
    : 'en';

  // Sync i18n language with URL locale
  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  // Redirect to valid locale if invalid locale in URL
  useEffect(() => {
    if (routeLocale && !SUPPORTED_LOCALES.includes(routeLocale as SupportedLocale)) {
      const newPath = location.pathname.replace(`/${routeLocale}`, `/en`);
      navigate(newPath, { replace: true });
    }
  }, [routeLocale, location.pathname, navigate]);

  const changeLocale = (newLocale: SupportedLocale) => {
    const currentPath = location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    navigate(newPath);
  };

  const getLocalizedPath = (path: string) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/${currentLocale}/${cleanPath}`;
  };

  const value: LocaleContextType = {
    locale: currentLocale,
    changeLocale,
    getLocalizedPath,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}