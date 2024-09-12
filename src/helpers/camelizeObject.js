import { camelCase, isPlainObject } from 'lodash';

export const camelizeObject = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map((item) => camelizeObject(item));
    } else if (isPlainObject(obj)) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelizeObject(obj[key]),
            }),
            {}
        );
    }
    return obj;
};
