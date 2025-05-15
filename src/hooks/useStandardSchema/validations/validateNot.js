import { custom } from 'valibot';

export const validateNot = () => {
  return custom(() => true);
};
