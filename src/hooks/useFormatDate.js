import { bindLast } from '../helpers/bindLast';
import { formatDate } from '../helpers/formatDate';
import { getLocale } from '../helpers/getLocale';
import { useTranslations } from './useTranslations';

export const useFormatDate = () => {
    const { currentLanguage } = useTranslations();
    const locale = getLocale(currentLanguage.code);
    return bindLast(formatDate, {
        locale,
    });
};
