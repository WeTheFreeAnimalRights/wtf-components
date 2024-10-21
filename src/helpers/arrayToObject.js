import { reduce } from 'lodash';
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
