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
    params['filter[search]'] = search;

    // Add the order
    params['sort'] = (order === 'asc' ? '' : '-') + snakeCase(orderField);

    // Fetch the page
    params['page'] = page;

    return params;
};
