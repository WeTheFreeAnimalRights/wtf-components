import { isEmpty, isString } from 'lodash-es';

export const parseDate = (value = '') => {
    if (isString(value) && !isEmpty(value)) {
        return new Date(value);
    }
    return value;
};
