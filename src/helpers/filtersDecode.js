import { isPlainObject, isString } from 'lodash-es';
import { parseJson } from './parseJson';

export const filtersDecode = (str = '', defaultValues = {}) => {
    // If an empty thing is passed, then ignore it
    if (!str || !isString(str)) {
        return defaultValues;
    }

    const jsonStr = atob(str);
    const final = parseJson(jsonStr);

    if (isPlainObject(final)) {
        return {
            ...defaultValues,
            ...final,
        };
    }

    return {};
};
