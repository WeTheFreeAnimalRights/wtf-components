import { words as _words } from 'lodash';

export const textContains = (text, contains = []) => {
    const words = _words(text);
    return words.every((word) =>
        contains.some((item) => item.toLowerCase().includes(word.toLowerCase()))
    );
};