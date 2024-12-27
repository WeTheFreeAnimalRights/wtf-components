import { isUndefined, reduce } from 'lodash';
export const objectToArray = (obj = {}, count = 2, keyToUse) => {
    // Create an empty array with a certain length
    const final = Array(count).fill(undefined);

    // Return the array
    return reduce(
        obj,
        (result, value, key) => {
            const usedKey = isUndefined(keyToUse) ? key : value[keyToUse];
            result[usedKey] = value;
            return result;
        },
        final
    );
};
