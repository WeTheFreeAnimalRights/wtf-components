import { array, any, minLength, optional, pipe } from 'valibot';

export const validateMultiple = (field, { t }) => {
    if (field.optional) {
        return optional(array(any()));
    }

    return pipe(array(any()), minLength(1, t('required-field')));
};
