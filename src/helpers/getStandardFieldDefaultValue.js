import { isUndefined } from 'lodash-es';

export const getStandardFieldDefaultValue = (field) => {
    if (!isUndefined(field.defaultValue)) {
        return field.defaultValue;
    }
    if (field.type === 'boolean') {
        return false;
    }
    return '';
};
