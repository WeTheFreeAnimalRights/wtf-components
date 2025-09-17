import { startOfToday } from 'date-fns';
import { isEmpty, isString } from 'lodash-es';

export const parseDate = (value = '', withTime = false) => {
    if (isString(value)) {
        if (!isEmpty(value)) {
            if (withTime) {
                return new Date(value);
            } else {
                return new Date(value + 'T00:00:00');
            }
        } else {
            return startOfToday();
        }
    }
    return value;
};
