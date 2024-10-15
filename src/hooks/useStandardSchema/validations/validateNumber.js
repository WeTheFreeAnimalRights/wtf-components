import { validateText } from './validateText';

export const validateNumber = (field, { t, z }) => {
    // return validateText(field, {t,z})
    return z.number();
};
