import { string, minLength, optional, pipe } from 'valibot';

export const validateText = (field, { t }) => {
    if (!field.optional) {
        return pipe(string(), minLength(1, t('required-field')));
    }

    return optional(string());
};
