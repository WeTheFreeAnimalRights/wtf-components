import { getApiConfig } from './getApiConfig';

export const getUrl = (endpoint = '', key = 'public') => {
    const currentConfig = getApiConfig(key);

    if (!currentConfig.endpoints[endpoint]) {
        throw new Error(`API endpoint "${endpoint}" not found`);
    }

    return currentConfig.base + currentConfig.endpoints[endpoint];
};
