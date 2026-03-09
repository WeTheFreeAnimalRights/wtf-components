import { range, sortBy, zipObject } from 'lodash-es';

export const reorderByIds = (items, ids) => {
    const orderIndex = zipObject(ids, range(ids.length));
    return sortBy(items, (item) => orderIndex[item.id] ?? Infinity);
};
