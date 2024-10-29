export const getStandardDefaultValues = (standardSchema = []) => {
    return standardSchema.reduce((result, field) => {
        // If the field has children
        if (field.children && field.type !== 'custom') {
            return {
                ...result,
                ...getStandardDefaultValues(field.children),
            };
        }

        return {
            ...result,
            [field.name]: field.defaultValue,
        };
    }, {});
};
