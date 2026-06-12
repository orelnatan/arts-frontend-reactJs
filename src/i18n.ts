import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import i18n from 'i18next';

import { Locale } from './core';

i18n
  // Load translation files via HTTP (public/locales/...)
  .use(HttpBackend)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: Locale.En,
    lng: Locale.En, // Default language
    
    // Define all your namespaces (your domains)
    ns: ['auth', 'home', 'core', 'shared'],
    defaultNS: 'shared', // Fallback namespace if none is specified
    backend: {
      // Path to your translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
    // Clean up language codes if needed (e.g., en-US instead of en)
    load: 'currentOnly' 
  });

export default i18n;