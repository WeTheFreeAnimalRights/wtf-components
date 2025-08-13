import { formatDate } from './formatDate';

export const getStandardFieldValue = (field, { values }) => {
    const value = values[field.name];

    if (
        (field.type === 'datepicker' || field.type === 'timepicker') &&
        value instanceof Date
    ) {
        if (field.showTime || field.type === 'timepicker') {
            return formatDate(value, 'yyyy-MM-dd HH:mm:ss');
        }
        return formatDate(value, 'yyyy-MM-dd');
    }

    return value;
};
