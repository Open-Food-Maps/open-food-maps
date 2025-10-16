'use client';

import { useState, useEffect } from 'react';
import { detectBrowser, getBrowserName, type BrowserType } from '../utils/browserDetection';
import { getCookie, setCookie } from '../utils/cookies';

interface AddToHomeScreenProps {
  className?: string;
}

export default function AddToHomeScreen({ className = '' }: AddToHomeScreenProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [browser, setBrowser] = useState<BrowserType>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if user has already dismissed the prompt
    const dismissed = getCookie('pwa-install-dismissed');
    if (dismissed) return;

    // Detect browser
    const detectedBrowser = detectBrowser();
    setBrowser(detectedBrowser);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For browsers that don't support beforeinstallprompt, show custom prompt
    if (detectedBrowser !== 'other' && !deferredPrompt) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setCookie('pwa-install-dismissed', 'true', 365); // 1 year
  };

  const handleDontShowAgain = () => {
    setShowPrompt(false);
    setCookie('pwa-install-dismissed', 'true', 365); // 1 year
  };

  if (!showPrompt) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}>
      <div className="bg-theme-back-sec text-theme-fore rounded-2xl p-4 shadow-lg border border-theme-fore/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-theme-fore/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold mb-1">Install App</h3>
            <p className="text-xs text-theme-fore-75 mb-3">
              Add this app to your home screen for quick access and a better experience.
            </p>
            
            <div className="flex gap-2">
              {deferredPrompt ? (
                <button
                  onClick={handleInstall}
                  className="px-3 py-1.5 bg-theme-fore text-theme-back text-xs font-medium rounded-lg hover:bg-theme-fore/90 transition-colors"
                >
                  Install
                </button>
              ) : (
                <button
                  onClick={() => window.open('https://www.google.com/search?q=how+to+install+app+to+home+screen', '_blank')}
                  className="px-3 py-1.5 bg-theme-fore text-theme-back text-xs font-medium rounded-lg hover:bg-theme-fore/90 transition-colors"
                >
                  Learn How
                </button>
              )}
              
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-theme-fore-75 text-xs font-medium rounded-lg hover:bg-theme-fore/10 transition-colors"
              >
                Not Now
              </button>
            </div>
            
            <button
              onClick={handleDontShowAgain}
              className="text-xs text-theme-fore-50 hover:text-theme-fore-75 transition-colors mt-2"
            >
              Don't show again
            </button>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-theme-fore-50 hover:text-theme-fore-75 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
