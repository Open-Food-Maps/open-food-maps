export type BrowserType = 
  | 'safari-ios'
  | 'chrome-android'
  | 'chrome-ios'
  | 'firefox-android'
  | 'firefox-ios'
  | 'samsung-android'
  | 'other';

export function detectBrowser(): BrowserType {
  if (typeof window === 'undefined') return 'other';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  
  // Safari on iOS
  if (isIOS && /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent)) {
    return 'safari-ios';
  }
  
  // Chrome on Android
  if (isAndroid && /chrome/.test(userAgent) && !/samsung/.test(userAgent)) {
    return 'chrome-android';
  }
  
  // Chrome on iOS
  if (isIOS && /crios/.test(userAgent)) {
    return 'chrome-ios';
  }
  
  // Firefox on Android
  if (isAndroid && /firefox/.test(userAgent)) {
    return 'firefox-android';
  }
  
  // Firefox on iOS
  if (isIOS && /fxios/.test(userAgent)) {
    return 'firefox-ios';
  }
  
  // Samsung Internet on Android
  if (isAndroid && /samsung/.test(userAgent)) {
    return 'samsung-android';
  }
  
  return 'other';
}

export function getBrowserName(browser: BrowserType): string {
  switch (browser) {
    case 'safari-ios':
      return 'Safari';
    case 'chrome-android':
    case 'chrome-ios':
      return 'Chrome';
    case 'firefox-android':
    case 'firefox-ios':
      return 'Firefox';
    case 'samsung-android':
      return 'Samsung Internet';
    default:
      return 'your browser';
  }
}
