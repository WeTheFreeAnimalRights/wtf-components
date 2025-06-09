export const getNewCount = (items = []) => {
    return items.filter((item) => item.isNew).length;
};
