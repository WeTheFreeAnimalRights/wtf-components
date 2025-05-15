import { enUS, fr, es, it, de, tr, pt, nl, id, ru, bg, hi, ka, ar, th, he } from 'date-fns/locale';

const localeMap = {
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

export const setDateLocale = (locale = 'en') => {
  return localeMap[locale] || enUS;
};
