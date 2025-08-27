import { optional, unknown } from 'valibot';

export const validateUpload = (field) => {
    if (!field.optional) {
        return unknown();
    }

    return optional(unknown());
};
