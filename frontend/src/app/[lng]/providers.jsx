'use client'

import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import { ThemeProvider } from 'next-themes'

export function Providers({ children, lng }) {
  i18n.changeLanguage(lng)
  
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </I18nextProvider>
  )
}