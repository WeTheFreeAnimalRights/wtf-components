import { reduce, snakeCase, isFunction } from 'lodash';

export const getServerFilters = ({
    filters = {},
    order,
    orderField,
    search,
    page,
    parseFilter,
}) => {
    // Add the filters
    const params = reduce(
        filters,
        (result, value, key) => {
            let filter = { name: key, value };
            if (isFunction(parseFilter)) {
                filter = parseFilter(filter);
            }
            return {
                ...result,
                [`filter[${snakeCase(filter.name)}]`]: filter.value,
            };
        },
        {}
    );

    // Add the search
    if (search !== false) {
        params['filter[search]'] = search;
    }

    // Add the order
    if (order !== false) {
        params['sort'] = (order === 'asc' ? '' : '-') + snakeCase(orderField);
    }

    // Fetch the page
    if (page !== false) {
        params['page'] = page;
    }

    return params;
};
