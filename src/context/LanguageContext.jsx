import React, { useState, useEffect } from 'react';
import { LanguageContext } from './language-context';
import { translations } from '../i18n/translations';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('ctf_bg_lang');
      return saved === 'en' ? 'en' : 'bg';
    } catch {
      return 'bg';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ctf_bg_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'bg' ? 'en' : 'bg'));
  };

  const t = translations[lang] || translations.bg;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
