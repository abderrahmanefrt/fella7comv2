import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Briefcase, Tractor, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { wilayas } from '../data/mockData';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import './Auth.css';

export default function Register() {
  const [role, setRole] = useState('agriculteur');
  const { login } = useAuth();
  const { t, translateWilaya } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    company: '',
    wilaya: ''
  });

  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyError, setPrivacyError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setPrivacyError('');

    if (!acceptedPrivacy) {
      setPrivacyError(t('register.privacyError'));
      return;
    }

    // Simulate real registration and instant login
    const newUser = {
      id: 'usr_' + Math.floor(Math.random() * 10000),
      name: formData.name,
      email: formData.email,
      role: role,
      plan: 'freemium',
      itemsCount: 0,
      avatar: formData.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      wilaya: formData.wilaya,
      company: formData.company
    };

    login(newUser);
    navigate('/');
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container glass-panel" style={{ maxWidth: '600px' }}>
        <div className="auth-header text-center">
          <Sprout size={48} className="text-primary" style={{ margin: '0 auto var(--spacing-md)' }} />
          <h1>{t('register.joinTitle')}</h1>
          <p className="text-muted">{t('register.joinSubtitle')}</p>
        </div>

        <div className="role-selector">
          <button
            className={`role-btn ${role === 'agriculteur' ? 'active' : ''}`}
            onClick={() => setRole('agriculteur')}
          >
            <Tractor size={24} />
            <span>{t('register.roleFarmer')}</span>
          </button>

          <button
            className={`role-btn ${role === 'buyer' ? 'active' : ''}`}
            onClick={() => setRole('buyer')}
          >
            <ShoppingCart size={24} />
            <span>{t('register.roleBuyer')}</span>
          </button>

          <button
            className={`role-btn ${role === 'business' ? 'active' : ''}`}
            onClick={() => setRole('business')}
          >
            <Briefcase size={24} />
            <span>{t('register.roleBusiness')}</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>{t('register.fullNameLabel')}</label>
            <input name="name" type="text" placeholder={t('register.fullNamePlaceholder')} value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>{t('register.emailLabel')}</label>
            <input name="email" type="email" placeholder={t('register.emailPlaceholder')} value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>{t('register.avatarLabel')}</label>
            <input name="avatar" type="url" placeholder={t('register.avatarPlaceholder')} value={formData.avatar} onChange={handleChange} />
            <small className="text-muted" style={{ display: 'block', marginTop: '4px' }}>{t('register.avatarHelp')}</small>
          </div>

          <div className="form-group">
            <label>{t('register.passwordLabel')}</label>
            <input name="password" type="password" placeholder={t('register.passwordPlaceholder')} value={formData.password} onChange={handleChange} required />
          </div>

          {role === 'business' && (
            <div className="form-group">
              <label>{t('register.companyLabel')}</label>
              <input name="company" type="text" placeholder={t('register.companyPlaceholder')} value={formData.company} onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <label>{t('register.wilayaLabel')}</label>
            <select name="wilaya" value={formData.wilaya} onChange={handleChange} required>
              <option value="">{t('register.selectWilaya')}</option>
              {wilayas.filter(w => w !== 'All Wilayas').map((w, index) => {
                const num = String(index + 1).padStart(2, '0');
                return (
                  <option key={w} value={w}>
                    {num} - {translateWilaya(w)}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="privacy-accept-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              />
              {t('register.privacyCheckbox')}{' '}
              <button
                type="button"
                className="text-primary privacy-link-btn"
                onClick={() => setShowPrivacyModal(true)}
              >
                {t('register.privacyLinkText')}
              </button>
            </label>
          </div>

          {privacyError && <div className="text-danger" style={{fontSize: '0.82rem', textAlign: 'center'}}>{privacyError}</div>}

          <button
            type="submit"
            className={`btn-primary full-width auth-btn ${!acceptedPrivacy ? 'btn-disabled' : ''}`}
            style={{ marginTop: 'var(--spacing-md)' }}
            disabled={!acceptedPrivacy}
          >
            {t('register.btnCreateAccount')}
          </button>
        </form>

        <div className="auth-footer text-center">
          {t('register.alreadyHaveAccount')} <Link to="/login" className="text-primary font-bold">{t('register.btnLogIn')}</Link>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        mode="auth"
      />
    </div>
  );
}
