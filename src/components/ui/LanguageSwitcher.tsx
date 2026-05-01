import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('nw_lang', code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  return (
    <div className="flex items-center gap-1">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`px-2 py-1 font-mono text-xs uppercase tracking-widest transition-colors ${
            current === lang.code
              ? 'text-[#FF0000] border-b border-[#FF0000]'
              : 'text-[#888888] hover:text-white'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
