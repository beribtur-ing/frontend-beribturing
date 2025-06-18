import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common translations
      profile: "Profile",
      settings: "Settings",
      signOut: "Sign Out",
      signIn: "Sign In",
      dashboard: "Dashboard",
      overview: "Overview",
      analytics: "Analytics",
      bookings: "Bookings",
      properties: "Properties",
      requests: "Requests",
      calendar: "Calendar",
      addProperty: "Add Property",
      editProperty: "Edit Property",
      
      // Dashboard specific
      totalRevenue: "Total Revenue",
      totalBookings: "Total Bookings",
      totalProperties: "Total Properties",
      occupancyRate: "Occupancy Rate",
      
      // Navigation
      home: "Home",
      login: "Login",
      logout: "Logout",
    }
  },
  ru: {
    translation: {
      // Common translations
      profile: "Профиль",
      settings: "Настройки",
      signOut: "Выйти",
      signIn: "Войти",
      dashboard: "Панель управления",
      overview: "Обзор",
      analytics: "Аналитика",
      bookings: "Бронирования",
      properties: "Недвижимость",
      requests: "Запросы",
      calendar: "Календарь",
      addProperty: "Добавить недвижимость",
      editProperty: "Редактировать недвижимость",
      
      // Dashboard specific
      totalRevenue: "Общий доход",
      totalBookings: "Всего бронирований",
      totalProperties: "Всего объектов",
      occupancyRate: "Уровень заполняемости",
      
      // Navigation
      home: "Главная",
      login: "Вход",
      logout: "Выход",
    }
  },
  uz: {
    translation: {
      // Common translations
      profile: "Profil",
      settings: "Sozlamalar",
      signOut: "Chiqish",
      signIn: "Kirish",
      dashboard: "Boshqaruv paneli",
      overview: "Umumiy ko'rinish",
      analytics: "Analitika",
      bookings: "Bandlashlar",
      properties: "Mulklar",
      requests: "So'rovlar",
      calendar: "Kalendar",
      addProperty: "Mulk qo'shish",
      editProperty: "Mulkni tahrirlash",
      
      // Dashboard specific
      totalRevenue: "Umumiy daromad",
      totalBookings: "Jami bandlashlar",
      totalProperties: "Jami mulklar",
      occupancyRate: "Band bo'lish darajasi",
      
      // Navigation
      home: "Bosh sahifa",
      login: "Kirish",
      logout: "Chiqish",
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