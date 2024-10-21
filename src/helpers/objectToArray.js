import { reduce } from 'lodash';
export const objectToArray = (obj = {}, count = 2) => {
    // Create an empty array with a certain length
    const final = [];
    final[count - 1] = undefined;

    // Return the array
    return reduce(
        obj,
        (result, value, key) => {
            result[key] = value;
            return result;
        },
        final
    );
};
