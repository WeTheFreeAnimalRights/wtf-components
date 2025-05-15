import { validateText } from './validateText';
import { regex, length, pipe } from 'valibot';

export const validateCountry = (field, { t }) => {
  return pipe(
    validateText(field, { t }),
    regex(/^[a-z0-9]+$/i, t('invalid-country-code-alphanum')),
    length(2, t('invalid-country-code-2chars'))
  );
};
