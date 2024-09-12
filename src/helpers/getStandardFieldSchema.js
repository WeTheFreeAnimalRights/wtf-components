import { isPlainObject, isString } from 'lodash';
import { getStandardFieldDefaultSchema } from './getStandardFieldDefaultSchema';
import { getStandardFieldExceptions } from './getStandardFieldExceptions';

export const getStandardFieldSchema = (field, options) => {
    const defaultFieldSchema = getStandardFieldDefaultSchema();

    // Apply schema to each field
    const { eachField = {} } = options || {};

    if (isPlainObject(field)) {
        const fieldException = getStandardFieldExceptions(field);

        return {
            ...defaultFieldSchema,
            ...fieldException,
            ...eachField,
            ...field,
        };
    } else if (isString(field)) {
        return {
            ...defaultFieldSchema,
            ...eachField,
            type: field,
        };
    }

    throw new Error(
        'Only string or objects can be passed on to standard schemas'
    );
};
