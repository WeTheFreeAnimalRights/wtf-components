import { map, snakeCase } from 'lodash-es';
import { getStandardFieldSchema } from './getStandardFieldSchema';
import { getStandardFieldDefaultValue } from './getStandardFieldDefaultValue';

export const getStandardSchema = (schema, options) => {
    return map(schema, (value, key) => {
        const fieldSchema = getStandardFieldSchema(value, options);

        return {
            ...fieldSchema,
            name: key,
            serverName: fieldSchema.serverName || snakeCase(key),
            defaultValue: getStandardFieldDefaultValue(fieldSchema),
        };
    });
};
