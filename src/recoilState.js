import { atom } from 'recoil';
import store from 'store2';
import { isDarkMode } from './helpers/isDarkMode';

export const translationsState = atom({
    key: 'translations',
    default: {},
});

export const currentThemeState = atom({
    key: 'theme',
    default: store.get('theme') || (isDarkMode() ? 'dark' : 'light'),
});

export const languagesState = atom({
    key: 'languages',
    default: [],
});

export const currentLanguageState = atom({
    key: 'currentLanguage',
    default: '',
});

export const confirmState = atom({
    key: 'confirm',
    default: {},
});

export const developmentModeState = atom({
    key: 'developmentMode',
    default: false,
});
