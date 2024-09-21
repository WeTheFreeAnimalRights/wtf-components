import { validateText } from './validateText';

export const validateUpload = (field, { t, z }) => {
    return validateText(field, { t, z });
};
