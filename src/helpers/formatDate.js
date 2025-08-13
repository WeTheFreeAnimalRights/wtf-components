import { format } from 'date-fns';

export const formatDate = (date, strFormat, options) => {
    const usedOptions = {
        ...options,
    };

    let result = '';
    try {
        result = format(date, strFormat, usedOptions);
    } catch (e) {
        console.error('Error formmating date', date, strFormat, e);
    }

    return result;
};
