import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Download, X, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PWABanner.css';

export default function PWABanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const { t } = useLanguage();

  // useRegisterSW hook from vite-plugin-pwa
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registered successfully');
      // Check if installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    },
    onRegisterError(error) {
      console.error('Service Worker registration failed:', error);
    },
  });

  useEffect(() => {
    // Monitor install state
    const checkInstallState = () => {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true // for iOS Safari
      ) {
        setIsInstalled(true);
        setShowInstallBanner(false);
      } else {
        setIsInstalled(false);
        // Show banner if prompt exists and user hasn't dismissed it
        if (deferredPrompt && !localStorage.getItem('pwa-dismissed')) {
          setShowInstallBanner(true);
        }
      }
    };

    checkInstallState();

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show install banner if not dismissed and not in standalone mode
      if (!window.matchMedia('(display-mode: standalone)').matches && !localStorage.getItem('pwa-dismissed')) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log('PWA was installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Connection status listeners
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      setShowOfflineToast(false);
      setTimeout(() => setShowOnlineToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineToast(true);
      setShowOnlineToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const dismissInstallBanner = () => {
    localStorage.setItem('pwa-dismissed', 'true');
    setShowInstallBanner(false);
  };

  const closeOfflineReady = () => setOfflineReady(false);
  const closeNeedRefresh = () => setNeedRefresh(false);

  return (
    <div className="pwa-notifications-container">
      {/* Offline Status Banner */}
      {isOffline && (
        <div className="pwa-offline-alert animate-slide-down">
          <WifiOff size={16} />
          <span>{t('pwa.offlineAlert')}</span>
        </div>
      )}

      {/* Connection Restored Toast */}
      {showOnlineToast && (
        <div className="pwa-toast success animate-slide-up">
          <div className="pwa-toast-content">
            <CheckCircle2 size={20} className="toast-icon" />
            <div>
              <h4>{t('pwa.onlineToastTitle')}</h4>
              <p>{t('pwa.onlineToastDesc')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Offline Ready Toast */}
      {offlineReady && (
        <div className="pwa-toast info animate-slide-up">
          <div className="pwa-toast-content">
            <CheckCircle2 size={20} className="toast-icon" />
            <div>
              <h4>{t('pwa.readyToastTitle')}</h4>
              <p>{t('pwa.readyToastDesc')}</p>
            </div>
            <button onClick={closeOfflineReady} className="pwa-toast-close">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Update Available Toast */}
      {needRefresh && (
        <div className="pwa-toast update animate-slide-up">
          <div className="pwa-toast-content">
            <RefreshCw size={20} className="toast-icon spin" />
            <div>
              <h4>{t('pwa.updateToastTitle')}</h4>
              <p>{t('pwa.updateToastDesc')}</p>
            </div>
            <div className="pwa-toast-actions">
              <button onClick={() => updateServiceWorker(true)} className="pwa-btn-reload">
                {t('pwa.updateBtn')}
              </button>
              <button onClick={closeNeedRefresh} className="pwa-toast-close">
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Install Prompt Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="pwa-install-banner animate-slide-up">
          <div className="pwa-install-content">
            <img src="/favicon.svg" alt="fella7com Logo" className="pwa-app-logo" />
            <div className="pwa-install-text">
              <h3>{t('pwa.installTitle')}</h3>
              <p>{t('pwa.installDesc')}</p>
            </div>
          </div>
          <div className="pwa-install-actions">
            <button onClick={handleInstallClick} className="pwa-btn-install">
              <Download size={16} />
              {t('pwa.installBtn')}
            </button>
            <button onClick={dismissInstallBanner} className="pwa-btn-dismiss">
              {t('pwa.dismissBtn')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
