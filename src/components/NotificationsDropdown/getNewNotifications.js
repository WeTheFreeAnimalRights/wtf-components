export const getNewNotifications = (items = [], { type }) => {
    return items.filter((item) => item.isNew && (!type || type === item.type));
};
