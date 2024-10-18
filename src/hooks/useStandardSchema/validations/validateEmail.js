import { validateText } from './validateText';

export const validateEmail = (field, { t, z }) => {
    return validateText(field, { t, z }).email({
        message: t('signup-invalid-email'),
    });
};
