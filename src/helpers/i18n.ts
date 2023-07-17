import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@helpers/langs/en.json';
import translationES from '@helpers/langs/es.json';

import env from './env';

declare module 'i18next' {
  interface CustomTypeOptions {
    allowObjectInHTMLChildren: true;
    returnNull: false;
  }
}

export enum ELanguages {
  EN = 'en',
  ES = 'es',
}

const languages = [ELanguages.EN, ELanguages.ES] as const;

interface ILocalLang {
  en: typeof import('@helpers/langs/en.json');
  es: typeof import('@helpers/langs/es.json');
}

const localLang: ILocalLang = {
  en: translationEN,
  es: translationES,
};

const i18nextConfig = {
  fallbackLng: languages,
  load: 'languageOnly',
  ns: 'translation',
  debug: env.IS_DEV,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  i18nFormat: {
    bindI18nStore: 'added',
  },
  react: {
    useSuspense: true,
    bindI18nStore: 'added',
  },
  resources: {
    en: {
      translation: localLang.en,
    },
    es: {
      translation: localLang.es,
    },
  },
} as InitOptions;

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(i18nextConfig);

export const runTimeTranslations = (runTimeData: unknown, lng: string) => {
  i18n.addResourceBundle(lng, 'translation', runTimeData);
};

export default i18n;
