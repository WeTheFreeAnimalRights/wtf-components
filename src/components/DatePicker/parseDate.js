import { startOfToday } from 'date-fns';
import { isEmpty, isString } from 'lodash-es';

export const parseDate = (value = '', withTime = false) => {
    if (isString(value)) {
        if (!isEmpty(value)) {
            return new Date(value);
        } else {
            return startOfToday();
        }
    }
    return value;
};
