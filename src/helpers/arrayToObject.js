import { reduce } from 'lodash-es';
export const arrayToObject = (arr = []) => {
    return reduce(
        arr,
        (result, value, key) => {
            if (value) {
                result[key] = value;
            }
            return result;
        },
        {}
    );
};
