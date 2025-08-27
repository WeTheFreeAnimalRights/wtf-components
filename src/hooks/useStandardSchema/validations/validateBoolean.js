import { boolean, custom, optional, pipe } from 'valibot';

export const validateBoolean = (field, { t }) => {
    if (!field.optional) {
        return pipe(
            boolean(),
            custom((val) => val === true, t('required-field'))
        );
    }

    return optional(boolean());
};
