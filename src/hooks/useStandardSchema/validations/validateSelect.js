import { validateText } from './validateText';

export const validateSelect = (field, { t, z }) => {
    return validateText(field, { t, z });
    /* .refine(
        (value) => {
            // If there is no option provided and it's optional then ignore
            // this rule
            if (!value && field.optional) {
                return true;
            }

            const found = field.options.find((item) => item.value === value);
            return Boolean(found);
        },
        {
            message: t('not-in-options'),
        }
    ); */
};
