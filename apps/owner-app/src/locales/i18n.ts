import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationUZ from './uz/translation.json';
import translationRU from './ru/translation.json';
import translationEN from './en/translation.json';
import { I18N_LANGUAGE } from '~/utils';

const resources = {
  uz: {
    translation: translationUZ,
  },
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

const language = localStorage.getItem(I18N_LANGUAGE);

if (!language) {
  localStorage.setItem(I18N_LANGUAGE, 'uz');
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(I18N_LANGUAGE) || 'uz',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
