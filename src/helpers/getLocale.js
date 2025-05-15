import { enUS, fr, es, it, de, tr, pt, nl, id, ru, bg, hi, ka, ar, th, he } from 'date-fns/locale';

export const getLocale = (locale = 'en') => {
    const localesMap = {
      en: enUS,
      fr,
      es,
      it,
      de,
      tr,
      pt,
      nl,
      id,
      ru,
      bg,
      hi,
      ka,
      ar,
      th,
      he,
    };
    const defaultLocale = localesMap.en;
  return localesMap[locale] || defaultLocale;
};
