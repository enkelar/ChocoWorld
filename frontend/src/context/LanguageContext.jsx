import { createContext, useContext, useEffect, useState } from 'react';
import en from '../languages/en';
import sq from '../languages/sq';


const translations = {en, sq};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cw_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('cw_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }

  function toggleLanguage() {
    setLang((l) => (l === 'en' ? 'sq' : 'en'));
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}