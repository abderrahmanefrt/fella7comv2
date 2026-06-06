import { Link, useNavigate } from 'react-router-dom';
import { Crown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Premium.css';

export default function Premium() {
  const { upgradePlan, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    upgradePlan();
    alert(t('premium.alertSuccess'));
    navigate('/');
  };

  return (
    <div className="premium-page animate-fade-in">
      <div className="container text-center premium-container">
         <Crown size={64} className="text-warning" style={{margin: '0 auto var(--spacing-md)'}} />
         <h1>{t('premium.title')}</h1>
         <p className="premium-subtitle">{t('premium.subtitle')}</p>
         
         <div className="pricing-cards">
            {/* Freemium Card */}
            <div className="pricing-card glass-panel">
               <h2>{t('premium.freeTitle')}</h2>
               <div className="price">{t('premium.freePrice')} <span className="unit">{t('premium.freeUnit')}</span></div>
               <ul className="features text-left">
                 <li><Check size={18} className="text-muted"/> {t('premium.freeF1')}</li>
                 <li><Check size={18} className="text-muted"/> {t('premium.freeF2')}</li>
                 <li><Check size={18} className="text-muted"/> {t('premium.freeF3')}</li>
               </ul>
               <button className="btn-secondary full-width" disabled>{t('premium.freeBtn')}</button>
            </div>
            
            {/* Premium Card */}
            <div className="pricing-card premium-card glass-panel hover-lift">
               <div className="ribbon">{t('premium.ribbon')}</div>
               <h2>{t('premium.premTitle')} <Crown size={20} className="text-warning" style={{display:'inline', verticalAlign:'text-bottom'}}/></h2>
               <div className="price text-warning">{t('premium.premPrice')} <span className="unit">{t('premium.premUnit')}</span></div>
               <ul className="features text-left">
                 <li><Check size={18} className="text-warning"/> {t('premium.premF1')}</li>
                 <li><Check size={18} className="text-warning"/> {t('premium.premF2')}</li>
                 <li><Check size={18} className="text-warning"/> {t('premium.premF3')}</li>
                 <li><Check size={18} className="text-warning"/> {t('premium.premF4')}</li>
               </ul>
               <button className="btn-primary full-width upgrade-btn" onClick={handleUpgrade}>
                 {t('premium.premBtn')}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
