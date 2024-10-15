import { reduce, snakeCase } from 'lodash';

export const getServerFilters = ({
    filters = {},
    order,
    orderField,
    search,
    page,
}) => {
    // Add the filters
    const params = reduce(
        filters,
        (result, value, key) => {
            return {
                ...result,
                [`filter[${snakeCase(key)}]`]: value,
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
