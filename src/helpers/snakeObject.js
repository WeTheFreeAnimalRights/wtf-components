import { snakeCase, isPlainObject } from 'lodash';

export const snakeObject = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map((item) => snakeObject(item));
    } else if (isPlainObject(obj)) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [snakeCase(key)]: snakeObject(obj[key]),
            }),
            {}
        );
    }
    return obj;
};
