import { useEffect, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { LocaleContext } from '../contexts';
import { useAuthContext, useLocale } from '../hooks';
import  { Locale, type User } from '../models';

const DEFAULT_LOCALE = Locale.En;

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const { user, setUser } = useAuthContext();
  const { locale: localLocale, setLocale: saveLocalLocale, removeLocale: removeLocalLocale } = useLocale();  

  const activeLocale = user?.locale || localLocale || DEFAULT_LOCALE;

  if (user?.locale && user.locale !== localLocale) {
    saveLocalLocale(user.locale);
  }

  useEffect(() => {
    const syncAppLanguage = async () => {
      if (i18n.language !== activeLocale) {
        await i18n.changeLanguage(activeLocale);
      }

      document.documentElement.lang = activeLocale.split('-')[0];
    };

    syncAppLanguage().catch(console.error);
  }, [activeLocale, i18n]);

  const setLocale = (locale: Locale) => {
    const setUserState = setUser as Dispatch<SetStateAction<User>>;

    setUserState(user => {      
      return {
        ...user,
        locale
      };
    });
        
    saveLocalLocale(locale);
  };

  const removeLocale = () => {
    removeLocalLocale();
  };

  return (
    <LocaleContext.Provider value={{ locale: activeLocale, setLocale, removeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};