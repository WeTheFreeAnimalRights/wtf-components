import { validateText } from './validateText';
import { minLength, pipe } from 'valibot';

export const validatePassword = (field, { t }) => {
  return pipe(
    validateText(field, { t }),
    minLength(8, t('minimum-password'))
  );
};
