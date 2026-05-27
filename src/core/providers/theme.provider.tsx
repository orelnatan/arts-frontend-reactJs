import { useEffect, type ReactNode } from 'react';

import { ThemeContext } from '../contexts';
import { useAuthContext, useTheme } from '../hooks';
import  { Theme, type User } from '../models';

const DEFAULT_THEME = Theme.Hyperion;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuthContext();
  const { theme: localTheme, setTheme: saveLocalTheme, removeTheme: removeLocalTheme } = useTheme();  

  const activeTheme = user?.theme || localTheme || DEFAULT_THEME;

  if (user?.theme && user.theme !== localTheme) {
    saveLocalTheme(user.theme);
  }

  useEffect(() => {
    document.body.className = activeTheme;
  }, [activeTheme]);

  const setTheme = (theme: Theme) => {
    setUser({ 
      ...user as User,
      theme
    })
        
    saveLocalTheme(theme);
  };

  const removeTheme = () => {
    removeLocalTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, setTheme, removeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};