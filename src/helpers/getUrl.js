import { getDefaultCode } from './getDefaultCode';
import { getDefaultLanguage } from './getDefaultLanguage';

export const getUrl = (language, code, preview = false) => {
    const parsedLanguage = language.toLowerCase();
    const parsedCode = code.toLowerCase();

    const defaultLanguage = getDefaultLanguage();
    const defaultCode = getDefaultCode();

    let languagePart = encodeURIComponent(parsedLanguage) + '/';
    if (defaultLanguage === parsedLanguage || parsedLanguage === '') {
        languagePart = '';
    }

    let codePart = encodeURIComponent(parsedCode);
    if (defaultCode.code === code) {
        codePart = '';
    }
    return '/' + languagePart + codePart + (preview ? '?preview=1' : '');
};
