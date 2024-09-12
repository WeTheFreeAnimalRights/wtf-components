export const getStandardFieldExceptions = (field) => {
    const exceptions = {};
    if (field.type === 'div') {
        exceptions.validate = false;
        exceptions.includeInRequest = false;
    }
    return exceptions;
};
