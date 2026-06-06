import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sprout size={24} />
            <span>fella7com</span>
          </div>
          <p>{t('footer.desc')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.colMarketplace')}</h4>
          <Link to="/search">{t('footer.allProducts')}</Link>
          <Link to="/new">{t('footer.newArrivals')}</Link>
          <Link to="/post">{t('footer.sellProduct')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('footer.colAccount')}</h4>
          <Link to="/login">{t('footer.login')}</Link>
          <Link to="/register">{t('footer.signUp')}</Link>
          <Link to="/profile">{t('footer.profile')}</Link>
          <Link to="/premium">{t('footer.premium')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('footer.colContact')}</h4>
          <span>contact@fella7com.com</span>
          <span>+213 555 123 456</span>
          <span>Algiers, Algeria</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  );
}
