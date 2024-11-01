import { isUndefined, reduce } from 'lodash';

export const getValuesFromSchema = (schema) => {
    return reduce(
        schema,
        (result, value) => {
            if (isUndefined(value.value)) {
                return result;
            }

            return {
                ...result,
                [value.name]: value.value,
            };
        },
        {}
    );
};
