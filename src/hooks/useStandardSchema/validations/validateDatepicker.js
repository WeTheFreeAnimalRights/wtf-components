import { validateText } from './validateText';

export const validateDatepicker = (field, { t, z }) => {
    return validateText(field, { t, z });
    // .date({
    //     required_error: t('It is required'),
    //     invalid_type_error: t('That\'s not a date!'),
    // });
};
