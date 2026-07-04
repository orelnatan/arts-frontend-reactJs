import { useState } from 'react'

import type { Locale } from '../models'

const LOCALE_KEY = 'app_locale'

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale | null>(() => {
    return localStorage.getItem(LOCALE_KEY) as Locale
  })

  const saveLocale = (locale: Locale) => {
    localStorage.setItem(LOCALE_KEY, locale)
    setLocale(locale)
  }

  const removeLocale = () => {
    localStorage.removeItem(LOCALE_KEY)
    setLocale(null)
  }

  return {
    locale,
    setLocale: saveLocale,
    removeLocale,
  }
}
