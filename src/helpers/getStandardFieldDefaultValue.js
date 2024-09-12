export const getStandardFieldDefaultValue = (field) => {
    if (typeof field.defaultValue !== 'undefined') {
        return field.defaultValue;
    }
    if (field.type === 'boolean') {
        return false;
    }
    return '';
};
