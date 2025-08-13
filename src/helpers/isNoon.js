import { getHours, getMinutes, getSeconds, getMilliseconds } from 'date-fns';

/**
 * Checks if the given date is exactly noon (12:00:00.000)
 * @param {Date} date
 * @returns {boolean}
 */
export const isNoon = (date) => {
    return (
        getHours(date) === 12 &&
        getMinutes(date) === 0 &&
        getSeconds(date) === 0 &&
        getMilliseconds(date) === 0
    );
};
