import { isNumber, isString } from 'lodash-es';

/**
 * Interpolates variables wrapped with `{}` in `str` with variables in `obj`
 * It will replace what it can, and leave the rest untouched
 *
 * @param {String} str
 * @param {Array|Object} obj
 *
 * @return {String}
 */
export const getInterpolatedString = (str = '', obj = []) => {
    return (str || '').replace(/{([^{}]*)}/g, (match, keyword) => {
        const replace = obj[keyword];
        return isString(replace) || isNumber(replace) ? replace : match;
    });
};
