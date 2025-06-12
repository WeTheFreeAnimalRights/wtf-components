import { format } from 'date-fns';
import { mapValues } from 'lodash-es';

export const parseValues = (values) => {
    return mapValues(values, (value) => {
        if (value instanceof Date) {
            return format(value, 'yyyy-MM-dd');
        }

        return value;
    });
};
