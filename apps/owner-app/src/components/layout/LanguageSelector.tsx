import React from 'react';
import i18n from 'i18next';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { I18N_LANGUAGE } from '~/utils';

const LANGUAGES = [
  { code: 'uz', label: 'Uz' },
  { code: 'ru', label: 'Ru' },
  { code: 'en', label: 'En' },
];

export const LanguageSelector: React.FC = () => {
  const [currentLang, setCurrentLang] = React.useState<string>(
    localStorage.getItem(I18N_LANGUAGE) || i18n.language || 'uz',
  );

  const handleChange = (event) => {
    const selectedLang = event.target.value as string;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem(I18N_LANGUAGE, selectedLang);
    setCurrentLang(selectedLang);
  };

  return (
    <FormControl size="small" variant="outlined" sx={{ minWidth: 80 }}>
      <InputLabel id="lang-select-label">Lang</InputLabel>
      <Select labelId="lang-select-label" id="lang-select" value={currentLang} onChange={handleChange} label="Lang">
        {LANGUAGES.map(({ code, label }) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
