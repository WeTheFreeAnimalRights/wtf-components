import { validateText } from './validateText';

export const validateCode = (field, { t, z }) => {
    return validateText(field, { t, z })
        .regex(/^[a-z0-9]+$/i, { message: t('invalid-code-alphanum') })
        .length(5, { message: t('invalid-code-5chars') });
};
