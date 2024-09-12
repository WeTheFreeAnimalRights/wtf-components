import { reduce, isEmpty } from 'lodash';

export const filtersEncode = (obj = {}) => {
    const noEmptyValues = reduce(
        obj,
        (result, value, key) => {
            if (!value) {
                return result;
            }

            return {
                ...result,
                [key]: value,
            };
        },
        {}
    );

    if (isEmpty(noEmptyValues)) {
        return '';
    }

    const jsonStr = JSON.stringify(noEmptyValues);
    return btoa(jsonStr);
};
