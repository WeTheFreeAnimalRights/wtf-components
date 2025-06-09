import { format } from "date-fns";

export const getStandardFieldValue = (field, { values }) => {
    const value = values[field.name];

    if (field.type === 'datepicker' && value instanceof Date) {
        return format(value, 'yyyy-MM-dd');
    }

    return value;
}
