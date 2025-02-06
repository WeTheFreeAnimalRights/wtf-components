import { getApiConfig } from './getApiConfig';
import { mergePaths } from './mergePaths';

export const getUrl = (endpoint = '', key = 'public') => {
    // If it's a url, then no need to add anything to it
    if (/^http(s)?:\/\//i.test(endpoint)) {
        return endpoint;
    }

    const currentConfig = getApiConfig(key);

    if (!currentConfig.endpoints[endpoint]) {
        throw new Error(`API endpoint "${endpoint}" not found`);
    }

    return mergePaths(currentConfig.base, currentConfig.endpoints[endpoint]);
};
