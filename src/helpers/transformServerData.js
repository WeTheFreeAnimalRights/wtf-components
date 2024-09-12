import { camelizeObject } from './camelizeObject';

export const transformServerData = (serverData = {}) => {
    const data = camelizeObject(serverData.data);
    const pagination = {
        current: serverData.meta.current_page,
        total: serverData.meta.last_page,
        perPage: serverData.meta.per_page,
        countFrom: serverData.meta.from,
        countTo: serverData.meta.to,
        countTotal: serverData.meta.total,
    };

    return {
        data,
        pagination,
    };
};
