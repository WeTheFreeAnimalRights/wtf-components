import { validateText } from './validateText';

export const validateCountry = (field, { t, z }) => {
    return validateText(field, { t, z })
        .regex(/^[a-z0-9]+$/i, { message: t('invalid-country-code-alphanum') })
        .length(2, { message: t('invalid-country-code-2chars') });
};
