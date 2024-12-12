import { validateText } from './validateText';

export const validateTogglegroup = (field, { t, z }) => {
    return validateText(field, { t, z });
};
