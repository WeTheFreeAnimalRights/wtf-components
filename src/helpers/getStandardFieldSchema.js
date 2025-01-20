import { isPlainObject, isString } from 'lodash-es';
import { getStandardFieldDefaultSchema } from './getStandardFieldDefaultSchema';

export const getStandardFieldSchema = (field, options) => {
    const defaultFieldSchema = getStandardFieldDefaultSchema();

    // Apply schema to each field
    const { eachField = {} } = options || {};

    if (isPlainObject(field)) {
        return {
            ...defaultFieldSchema,
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
