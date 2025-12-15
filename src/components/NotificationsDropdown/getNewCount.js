import { getNewNotifications } from "./getNewNotifications";

export const getNewCount = (items = [], extra) => {
    const newItems = getNewNotifications(items, extra);
    return newItems.length;
};
