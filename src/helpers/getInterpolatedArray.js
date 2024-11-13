/**
 * Interpolates variables wrapped with `{}` in `str` with variables in `obj`
 * It will replace what it can, and leave the rest untouched
 *
 * @param {String} str
 * @param {Array|Object} obj
 *
 * @return {Array}
 */
export const getInterpolatedArray = (str = '', obj = []) => {
    return str.split(/{([^{}]*)}/g).map((value, index) => {
        if (index % 2 === 0) {
            return value;
        }
        return obj[value] || `{${value}}`;
    });
};
