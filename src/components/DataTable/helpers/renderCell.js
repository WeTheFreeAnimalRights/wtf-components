export const renderCell = (field, item) => {
    const value = item[field.serverName];

    if (typeof field.render === 'function') {
        return field.render(value, item);
    }

    return value;
};
