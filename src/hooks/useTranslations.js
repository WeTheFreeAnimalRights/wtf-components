import { get, isString } from 'lodash-es';

import {
    translationsState,
    languagesState,
    currentLanguageState,
} from '../appState';
import { getInterpolatedString } from '../helpers/getInterpolatedString';
import { SecureStore } from '../store/SecureStore';
import { useGlobalState } from '../store/AppState';
import { setDateLocale } from '../helpers/setDateLocale';

export const useTranslations = () => {
    // Handle translations
    const [translations, setTranslations] = useGlobalState(translationsState);
    const t = (key, ...params) => {
        let translation = get(translations, key, key);
        if (!isString(translation)) {
            translation = key;
        }
        return getInterpolatedString(translation, ...params);
    };

    // Handle languages
    const [languages, setLanguages] = useGlobalState(languagesState);
    const [currentLanguage, setCurrentLanguage] =
        useGlobalState(currentLanguageState);

    return {
        // Pass the translations helpers
        t,
        setTranslations,

        // Pass the languages helpers
        languages,
        setLanguages,
        currentLanguage,
        setCurrentLanguage: (item) => {
            // Set the language for dates
            setDateLocale(item.code);

            // Set the current language
            SecureStore.set('language', item.code);

            // Save to app store
            setCurrentLanguage(item);
        },
    };
};
