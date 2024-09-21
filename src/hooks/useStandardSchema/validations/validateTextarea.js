import { validateText } from './validateText';

export const validateTextarea = (field, { t, z }) => {
    return validateText(field, { t, z });
};
