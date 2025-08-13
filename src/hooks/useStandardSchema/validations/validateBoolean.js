import { literal, optional } from 'valibot';

export const validateBoolean = (field, { t }) => {
  if (!field.optional) {
    // Only accepts true; missing/false -> "required-field"
    return literal(true, t('required-field'));
  }
  // Optional checkbox: allow undefined or true/false as you like
  return optional(literal(true)); // or optional(boolean())
};
