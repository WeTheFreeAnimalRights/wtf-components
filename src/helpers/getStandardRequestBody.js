export const getStandardRequestBody = (standardSchema, values) => {
    return standardSchema.reduce((result, field) => {
        if (field.children && field.type !== 'custom') {
            return {
                ...result,
                ...getStandardRequestBody(field.children, values),
            };
        }

        // If the field is not meant to be included in the request
        if (field.includeInRequest === false) {
            return result;
        }

        return {
            ...result,
            [field.serverName]: values[field.name],
        };
    }, {});
};
