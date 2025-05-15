import { getFieldValidation } from './getFieldValidation';

export const getValidationSchema = (standardSchema = [], tools = {}) => {
    return standardSchema.reduce(
        (result, field) => {
            return {
                schema: {
                    ...result.schema,
                    [field.name]: getFieldValidation(field, tools),
                },
                defaultValues: {
                    ...result.defaultValues,
                    [field.name]: field.defaultValue,
                },
            };
        },
        {
            schema: {},
            defaultValues: {},
        }
    );
};
