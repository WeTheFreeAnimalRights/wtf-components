import { isPlainObject, isString } from 'lodash-es';

export const filtersDecode = (str = '', defaultValues = {}) => {
    // If an empty thing is passed, then ignore it
    if (!str || !isString(str)) {
        return defaultValues;
    }

    const jsonStr = atob(str);
    let final;
    try {
        final = JSON.parse(jsonStr);
    } catch (error) {
        console.error(error);
    }

    if (isPlainObject(final)) {
        return {
            ...defaultValues,
            ...final,
        };
    }

    return {};
};
