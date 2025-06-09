import { forward, partialCheck } from 'valibot';

export const getCustomValidations = (standardSchema = [], { t }) => {
    return standardSchema.reduce((rules, field) => {
        // Confirmation property
        if (field.confirmation) {
            return [
                ...rules,
                forward(
                    partialCheck(
                        [[field.name], [field.confirmation]],
                        (input) =>
                            input[field.name] === input[field.confirmation],
                        t(`${field.confirmation}-does-not-match`)
                    ),
                    [field.name]
                ),
            ];
        }

        return rules;
    }, []);
};
