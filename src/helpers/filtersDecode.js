import { isPlainObject, isString } from 'lodash';

export const filtersDecode = (str = '') => {
    // If an empty thing is passed, then ignore it
    if (!str || !isString(str)) {
        return {};
    }

    const jsonStr = atob(str);
    let final;
    try {
        final = JSON.parse(jsonStr);
    } catch (error) {
        console.error(error);
    }

    if (isPlainObject(final)) {
        return final;
    }

    return {};
};
