import { isArray } from 'lodash-es';
import { custom } from 'valibot';

export const getCustomValidations = (
    standardSchema = [],
    { t }
) => {
    return standardSchema.reduce((rules, field) => {
        // Confirmation property
        if (field.confirmation) {
            return [
                ...rules,
                custom((values) => {
                    if (values[field.name] !== values[field.confirmation]) {
                        return {
                            issue: {
                                path: [field.name],
                                message: t(`${field.confirmation}-does-not-match`),
                            },
                        };
                    }
                    // Valid
                    return true;
                }),
            ];
        }

        // Not allowed property
        if (field.notAllowed) {
            const notAllowed = isArray(field.notAllowed)
                ? field.notAllowed
                : [field.notAllowed];

            return [
                ...rules,
                custom((values) => {
                    if (notAllowed.includes(values[field.name])) {
                        return {
                            issue: {
                                path: [field.name],
                                message: field.notAllowedMessage ||
                                t(`${field.name}-not-allowed-value`),
                            },
                        };
                    }
                    // Valid
                    return true;
                }),
            ];
        }

        return rules;
    }, []);
};
