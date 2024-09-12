import { getFieldValidation } from './getFieldValidation';

export const getZodSchema = (standardSchema = [], { t, z }) => {
    return standardSchema.reduce(
        (result, field) => {
            // If the field has children
            if (field.children) {
                const childrenZodSchema = getZodSchema(field.children, {
                    t,
                    z,
                });
                return {
                    zodSchema: {
                        ...result.zodSchema,
                        ...childrenZodSchema.zodSchema,
                    },
                    defaultValues: {
                        ...result.defaultValues,
                        ...childrenZodSchema.defaultValues,
                    },
                };
            }

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
