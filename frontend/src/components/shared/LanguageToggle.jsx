import { useLanguage } from '../../context/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="cw-lang-toggle"
      onClick={toggleLanguage}
      aria-label="Switch language"
    >
      {lang === 'en' ? 'SQ' : 'EN'}
    </button>
  );
}