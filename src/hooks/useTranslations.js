import { useRecoilValue } from 'recoil';
import { get } from 'lodash';
import { translationsState } from '../recoilState';
import { getInterpolatedString } from '../helpers/getInterpolatedString';

export const useTranslations = () => {
    const translations = useRecoilValue(translationsState);

    const t = (key, ...params) => {
        const translation = get(translations, key, key);
        return getInterpolatedString(translation, ...params);
    };

    return {
        t,
    };
};
