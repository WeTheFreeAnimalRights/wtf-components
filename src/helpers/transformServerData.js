export const transformServerData = (serverData = {}) => {
    const { data } = serverData;
    const pagination = {
        current: serverData.meta.currentPage,
        total: serverData.meta.lastPage,
        perPage: serverData.meta.perPage,
        countFrom: serverData.meta.from,
        countTo: serverData.meta.to,
        countTotal: serverData.meta.total,
    };

    return {
        data,
        pagination,
    };
};
