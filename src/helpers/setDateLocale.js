import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { getLocale } from './getLocale'

export const setDateLocale = (locale = 'en') => {
    setDefaultOptions({ locale: getLocale(locale) });
};
