import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header translations
      catalog: "Catalog",
      searchRentalItems: "Search for items to rent...",
      profile: "Profile",
      settings: "Settings",
      signOut: "Sign Out",
      signIn: "Sign In",
      favorites: "Favorites",
      
      // Hero banner translations
      rentEverythingYouNeed: "Rent Everything You Need",
      fromToolsToElectronics: "From tools to electronics, find everything you need for your projects",
      
      // Footer translations
      yourTrustedPlatformForRentingItems: "Your trusted platform for renting items",
      quickLinks: "Quick Links",
    }
  },
  ru: {
    translation: {
      // Header translations
      catalog: "Каталог",
      searchRentalItems: "Поиск товаров для аренды...",
      profile: "Профиль",
      settings: "Настройки",
      signOut: "Выйти",
      signIn: "Войти",
      favorites: "Избранное",
      
      // Hero banner translations
      rentEverythingYouNeed: "Арендуйте все, что вам нужно",
      fromToolsToElectronics: "От инструментов до электроники, найдите все необходимое для ваших проектов",
      
      // Footer translations
      yourTrustedPlatformForRentingItems: "Ваша надежная платформа для аренды товаров",
      quickLinks: "Быстрые ссылки",
    }
  },
  uz: {
    translation: {
      // Header translations
      catalog: "Katalog",
      searchRentalItems: "Ijara uchun narsalarni qidiring...",
      profile: "Profil",
      settings: "Sozlamalar",
      signOut: "Chiqish",
      signIn: "Kirish",
      favorites: "Sevimlilar",
      
      // Hero banner translations
      rentEverythingYouNeed: "Kerakli narsalarni ijaraga oling",
      fromToolsToElectronics: "Asboblardan elektronikagacha, loyihalaringiz uchun kerakli narsalarni toping",
      
      // Footer translations
      yourTrustedPlatformForRentingItems: "Narsalarni ijaraga berish uchun ishonchli platformangiz",
      quickLinks: "Tezkor havolalar",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;