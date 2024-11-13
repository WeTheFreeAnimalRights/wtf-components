import { isFunction } from 'lodash';

export const renderCell = (field, item) => {
    const value = item[field.name];

    if (isFunction(field.render)) {
        return field.render(value, item);
    }

    return value;
};
