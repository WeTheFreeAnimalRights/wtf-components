export const renderCell = (field, item) => {
    const value = item[field.name];

    if (typeof field.render === 'function') {
        return field.render(value, item);
    }

    return value;
};
