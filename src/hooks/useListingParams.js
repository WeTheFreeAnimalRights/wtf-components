import { each, mapValues } from 'lodash-es';
import { useSearchParams, useLocation } from 'wouter';

export const useListingParams = (defaultParams = {}) => {
    const [searchParams] = useSearchParams();
    const [location, navigate] = useLocation();

    const params = {
        page: parseInt(searchParams.get('page') || 1, 10),
        ...mapValues(
            defaultParams,
            (value, key) => searchParams.get(key) || value
        ),
    };

    const setParams = (toBeSetParams = {}) => {
        const newParams = {
            ...params,
            ...toBeSetParams,
        };

        const url = new URLSearchParams();
        each(newParams, (value, key) => {
            url.set(key, value);
        });
        navigate(location.pathname + '?' + url.toString());
    };

    return {
        params,
        setParams,
    };
};
