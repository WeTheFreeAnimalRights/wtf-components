import { map, snakeCase } from 'lodash';
import { getStandardFieldSchema } from './getStandardFieldSchema';
import { getStandardFieldDefaultValue } from './getStandardFieldDefaultValue';

export const getStandardSchema = (schema, options) => {
    return map(schema, (value, key) => {
        const fieldSchema = getStandardFieldSchema(value, options);

        // If there are children, then recurse
        if (fieldSchema.children) {
            fieldSchema.children = getStandardSchema(
                fieldSchema.children,
                options
            );
        }

        return {
            ...fieldSchema,
            name: key,
            serverName: fieldSchema.serverName || snakeCase(key),
            defaultValue: getStandardFieldDefaultValue(fieldSchema),
        };
    });
};
