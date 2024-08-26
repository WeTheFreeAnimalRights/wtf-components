import { useRecoilState } from 'recoil';
import { get } from 'lodash';
import {
    translationsState,
    languagesState,
    currentLanguageState,
} from '../recoilState';
import { getInterpolatedString } from '../helpers/getInterpolatedString';

export const useTranslations = () => {
    // Handle translations
    const [translations, setTranslations] = useRecoilState(translationsState);
    const t = (key, ...params) => {
        const translation = get(translations, key, key);
        return getInterpolatedString(translation, ...params);
    };

    // Handle languages
    const [languages, setLanguages] = useRecoilState(languagesState);
    const [currentLanguage, setCurrentLanguage] =
        useRecoilState(currentLanguageState);

    return {
        // Pass the translations helpers
        t,
        setTranslations,

        // Pass the languages helpers
        languages,
        setLanguages,
        currentLanguage,
        setCurrentLanguage,
    };
};
