import { validateText } from './validateText';

export const validateCombobox = (field, { t, z }) => {
    return validateText(field, { t, z });
};
