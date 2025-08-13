import { number, minValue, pipe } from 'valibot';

export const validateNumber = (field, { t }) => {
    if (field.minimum > 0) {
        return pipe(
            number(),
            minValue(field.minimum, t('min-field', [field.minimum]))
        );
    }
    return number();
};
