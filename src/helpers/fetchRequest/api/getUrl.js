import { getApiConfig } from './getApiConfig';
import { mergePaths } from './mergePaths';

export const getUrl = (endpoint = '', key = 'public') => {
    // If it's a url, then no need to add anything to it
    if (/^http(s)?:\/\//i.test(endpoint)) {
        return endpoint;
    }

    const currentConfig = getApiConfig(key);

    if (!currentConfig.endpoints[endpoint]) {
        const error = new Error(`API endpoint "${endpoint}" not found`);
        error.status = 700;
        throw error;
    }

    return mergePaths(currentConfig.base, currentConfig.endpoints[endpoint]);
};
