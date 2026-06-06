import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher-pill glass-panel">
      <Globe size={14} className="lang-globe-icon" />
      <button 
        onClick={() => setLanguage('fr')} 
        className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
        aria-label="Passer au Français"
      >
        FR
      </button>
      <button 
        onClick={() => setLanguage('ar')} 
        className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
        aria-label="التبديل إلى العربية"
      >
        العربية
      </button>
    </div>
  );
}
