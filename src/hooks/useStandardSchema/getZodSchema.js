import { getFieldValidation } from './getFieldValidation';

export const getZodSchema = (standardSchema = [], { t, z }) => {
    return standardSchema.reduce(
        (result, field) => {
            return {
                zodSchema: {
                    ...result.zodSchema,
                    [field.name]: getFieldValidation(field, { t, z }),
                },
                defaultValues: {
                    ...result.defaultValues,
                    [field.name]: field.defaultValue,
                },
            };
        },
        {
            zodSchema: {},
            defaultValues: {},
        }
    );
};
