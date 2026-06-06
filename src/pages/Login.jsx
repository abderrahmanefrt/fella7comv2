import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Auth.css';

export default function Login() {
  const { login, testAccounts } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const account = testAccounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
      login(account);
      navigate('/');
    } else {
      setError(t('login.errorInvalid'));
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container glass-panel">
        <div className="auth-header text-center">
          <Sprout size={48} className="text-primary" style={{ margin: '0 auto var(--spacing-md)' }} />
          <h1>{t('login.welcomeBack')}</h1>
          <p className="text-muted">{t('login.signInSubtitle')}</p>
        </div>

        {error && <div className="text-danger" style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>{t('login.emailLabel')}</label>
            <input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('login.passwordLabel')}</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> {t('login.rememberMe')}
            </label>
            <Link to="/forgot" className="text-primary">{t('login.forgotPassword')}</Link>
          </div>

          <button
            type="submit"
            className="btn-primary full-width auth-btn"
          >
            {t('login.btnLogIn')}
          </button>
        </form>

        <div className="demo-credentials" style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', background: '#F1F5F9', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
          <strong>{t('login.demoAccountsTitle')}</strong><br />
          Farmer: <code>farmer@gmail.com</code> / <code>farmer123</code><br />
          Buyer: <code>buyer@gmail.com</code> / <code>buyer123</code><br />
          Business: <code>business@gmail.com</code> / <code>business123</code>
        </div>

        <div className="auth-footer text-center mt-4">
          <Link to="/" className="text-primary">{t('login.cancelReturn')}</Link>
        </div>
      </div>
    </div>
  );
}
