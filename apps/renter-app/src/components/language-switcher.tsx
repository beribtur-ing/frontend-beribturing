import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { I18N_LANGUAGE } from '~/utils';
import i18n from '~/locales/i18n'; // or hardcode it as 'lang'

const languages = [
  { code: 'uz', name: "O'zbekcha" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = localStorage.getItem(I18N_LANGUAGE) || 'uz';

  const handleLanguageChange = (locale: string) => {
    console.log(`Changing language to: ${locale}`);
    if (i18n.hasResourceBundle(locale, 'translation')) {
      i18n.changeLanguage(locale);
      localStorage.setItem(I18N_LANGUAGE, locale);
      setIsOpen(false);
    } else {
      console.error(`Missing translations for: ${locale}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language.code === currentLang ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
