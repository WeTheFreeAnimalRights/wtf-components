import { isEmpty, isNull, isUndefined } from 'lodash-es';
import { custom } from 'valibot';

export const validateDatepicker = (field, { t }) => {
    const isValidDate = (value) => {
        return value instanceof Date && !isNaN(value.getTime());
    }

    if (!field.optional) {
        return custom(
            (value) => isValidDate(value),
            t('required-field')
        );
    }

    return custom(
        (value) => isUndefined(value) || isNull(value) || isEmpty(value) || isValidDate(value),
        t('invalid-date')
    );
};
