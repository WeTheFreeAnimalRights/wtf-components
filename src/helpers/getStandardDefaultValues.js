export const getStandardDefaultValues = (standardSchema = []) => {
    return standardSchema.reduce((result, field) => {
        return {
            ...result,
            [field.name]: field.defaultValue,
        };
    }, {});
};
