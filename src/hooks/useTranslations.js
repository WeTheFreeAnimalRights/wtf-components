import { useRecoilState } from 'recoil';
import { get, isString } from 'lodash';
import store from 'store2';
import moment from 'moment';

// Import moment locales
import 'moment/locale/fr';
import 'moment/locale/es';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/tr';
// import 'moment/locale/no';
import 'moment/locale/pt';
import 'moment/locale/nl';
import 'moment/locale/id';
import 'moment/locale/ru';
import 'moment/locale/bg';
import 'moment/locale/hi';
// import 'moment/locale/zh';
import 'moment/locale/ka';
import 'moment/locale/ar';
import 'moment/locale/th';
import 'moment/locale/he';

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
        let translation = get(translations, key, key);
        if (!isString(translation)) {
            translation = key;
        }
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
        setCurrentLanguage: (item) => {
            // Set the language for moment
            moment.locale(item.code);

            // Set the current language
            store.set('language', item.code);

            // Save to recoil
            setCurrentLanguage(item);
        },
    };
};
