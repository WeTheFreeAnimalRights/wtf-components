import { atom } from 'recoil';
import { isDarkMode } from './helpers/isDarkMode';
import { SecureStore } from './helpers/SecureStore';

export const translationsState = atom({
    key: 'translations',
    default: {},
});

export const currentThemeState = atom({
    key: 'theme',
    default: SecureStore.get('theme') || (isDarkMode() ? 'dark' : 'light'),
});

export const languagesState = atom({
    key: 'languages',
    default: [],
});

export const currentLanguageState = atom({
    key: 'currentLanguage',
    default: SecureStore.get('language') || '',
});

export const currentCodeState = atom({
    key: 'currentCode',
    default: null,
});

export const confirmState = atom({
    key: 'confirm',
    default: {},
});

export const developmentModeState = atom({
    key: 'developmentMode',
    default: false,
});

export const analyticsState = atom({
    key: 'analytics',
    default: {
        visitId: SecureStore.get('visitId' || 0),
    },
});
