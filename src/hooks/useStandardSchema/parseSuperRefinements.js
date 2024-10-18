import { isArray } from 'lodash';

export const parseSuperRefinements = (
    standardSchema = [],
    { values, ctx, t }
) => {
    standardSchema.forEach((field) => {
        if (field.children) {
            return parseSuperRefinements(field.children, { values, ctx, t });
        }

        // Confirmation property
        if (field.confirmation) {
            if (values[field.name] !== values[field.confirmation]) {
                ctx.addIssue({
                    code: 'custom',
                    message: t(`${field.confirmation}-does-not-match`),
                    path: [field.name],
                });
            }
        }

        // Not allowed property
        if (field.notAllowed) {
            const notAllowed = isArray(field.notAllowed)
                ? field.notAllowed
                : [field.notAllowed];
            if (notAllowed.includes(values[field.name])) {
                ctx.addIssue({
                    code: 'custom',
                    message:
                        field.notAllowedMessage ||
                        t(`${field.name}-not-allowed-value`),
                    path: [field.name],
                });
            }
        }
    });
};
