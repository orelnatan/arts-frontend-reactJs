import { useState } from 'react';

import type { Theme } from '../models';

const THEME_KEY = "app_theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(() => {
    return localStorage.getItem(THEME_KEY) as Theme;
  });

  const saveTheme = (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
    setTheme(theme);
  };

  const removeTheme = () => {
    localStorage.removeItem(THEME_KEY);
    setTheme(null);
  };

  return {
    theme,
    setTheme: saveTheme,
    removeTheme
  };
};