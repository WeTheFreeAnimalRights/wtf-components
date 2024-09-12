import { validateText } from './validateText';

export const validatePassword = (field, { t, z }) => {
    return validateText(field, { t, z }).min(8, {
        message: t('minimum-password'),
    });
};
