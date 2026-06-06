import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/fellahcom.png';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, performAction } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const success = performAction();
    if (!success) {
      navigate('/premium');
    } else {
      alert(t('navbar.limitAlert') + (user.itemsCount + 1));
    }
  };

  return (
    <header className="navbar glass-panel">
      <div className="container nav-content">

        {/* 🔥 LOGO + BRAND */}
        <Link to="/" className="brand" aria-label="Fella7Com Home">
          <img src={logo} alt="Fella7Com Logo" className="brand-logo big" />
        </Link>

        <nav className="nav-links">
          <Link to="/search" className="nav-item">
            <Search size={20} /> {t('navbar.deals')}
          </Link>

          <Link to="/new" className="nav-item">
            🌟 {t('navbar.newArrivals')}
          </Link>

          <div className="nav-actions">
            <LanguageSwitcher />
            
            {!user ? (
              <>
                <Link to="/login" className="btn-secondary">{t('navbar.logIn')}</Link>
                <Link to="/register" className="btn-primary">{t('navbar.signUp')}</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="user-status glass-panel hover-lift" style={{ textDecoration: 'none' }}>
                  <img src={user.avatar} alt="avatar" className="nav-avatar" />
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className={`user-plan ${user.plan === 'premium' ? 'text-warning' : ''}`}>
                      {user.plan === 'premium' ? <Crown size={12} /> : ''}
                      {user.plan.toUpperCase()} ({user.itemsCount}/3 {t('navbar.limits')})
                    </span>
                  </div>
                </Link>

                {user.role !== 'buyer' && (
                  <Link to="/post" className="btn-primary">
                    {t('navbar.postItem')}
                  </Link>
                )}

                <button onClick={logout} className="btn-icon hover-lift" title={t('navbar.logout')}>
                  <LogOut size={20} color="var(--color-danger)" />
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}