import { createContext } from "react";

import type { Locale } from "../models";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  removeLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);