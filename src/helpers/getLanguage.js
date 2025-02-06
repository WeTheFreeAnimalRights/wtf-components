import { getDefaultLanguage } from './getDefaultLanguage';

/**
 * This method validates the language that was sent and returns it, if correct
 * If there is no language, or the validation didn't work, then sends the
 * default language
 *
 * @param {String} code
 * @param {Object} languages
 *
 * @return {String}
 */
export const getLanguage = (code = '', languages = {}) => {
    // Check if the code is good
    if (code && languages[code]) {
        return languages[code];
    }

    // Get the default language
    const defaultLanguage = getDefaultLanguage();

    // Check if the browser's code is good
    const browserLanguage =
        navigator.userLanguage || navigator.language || defaultLanguage;
    const longLanguage = browserLanguage.split('-').join('_');
    if (languages[longLanguage]) {
        return languages[longLanguage];
    }
    const shortLanguage = browserLanguage.split('-')[0];
    if (languages[shortLanguage]) {
        return languages[shortLanguage];
    }

    return languages[defaultLanguage] || {};
};
