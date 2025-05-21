import { validateText } from './validateText';
import { regex, length, pipe } from 'valibot';

export const validateCode = (field, { t }) => {
    return pipe(
        validateText(field, { t }),
        regex(/^[a-z0-9]+$/i, t('invalid-code-alphanum')),
        length(5, t('invalid-code-5chars'))
    );
};
