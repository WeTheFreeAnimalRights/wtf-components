import { validateText } from './validateText';
import { email, pipe } from 'valibot';

export const validateEmail = (field, { t }) => {
  return pipe(
    validateText(field, { t }),
    email(t('signup-invalid-email'))
  );
};
