import { createContext } from 'react'

import type { Theme } from '../models'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  removeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
