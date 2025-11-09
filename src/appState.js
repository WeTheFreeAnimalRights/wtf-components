import { isDarkMode } from './helpers/isDarkMode';
import { SecureStore } from './store/SecureStore';
import { createGlobalState } from './store/AppState';

export const translationsState = createGlobalState({
    default: {},
});

export const currentThemeState = createGlobalState({
    default: SecureStore.get('theme') || (isDarkMode() ? 'dark' : 'light'),
});

export const languagesState = createGlobalState({
    default: [],
});

export const notificationsState = createGlobalState({
    default: [],
});

export const currentLanguageState = createGlobalState({
    default: SecureStore.get('language') || '',
});

export const currentCodeState = createGlobalState({
    default: null,
});

export const reportOptionsState = createGlobalState({
    default: [],
});

export const currentChatVisitorState = createGlobalState({
    default: null,
});

export const confirmState = createGlobalState({
    default: {},
});

export const developmentModeState = createGlobalState({
    default: false,
});

export const analyticsState = createGlobalState({
    default: {
        visitId: SecureStore.get('visitId' || 0),
    },
});

export const currentMeetingState = createGlobalState({
    default: {},
});
