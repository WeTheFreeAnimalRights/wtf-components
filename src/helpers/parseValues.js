import { mapValues } from 'lodash-es';
// import { formatDate } from './formatDate';

export const parseValues = (values) => {
    return mapValues(values, (value) => {
        // if (value instanceof Date) {
        //     console.log('>>withTime', value.withTime);
        //     return formatDate(value, 'yyyy-MM-dd');
        // }

        return value;
    });
};
