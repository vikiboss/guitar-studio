import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import jp from './locales/jp.json'
import zhCN from './locales/zh-cn.json'
import zhTW from './locales/zh-tw.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      jp,
      'zh-CN': zhCN,
      'zh-TW': zhTW,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
