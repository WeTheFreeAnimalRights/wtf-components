import { getApiConfig } from './getApiConfig';
import { mergePaths } from './mergePaths';

export const getUrl = (endpoint = '', key = 'public') => {
    const currentConfig = getApiConfig(key);

    if (!currentConfig.endpoints[endpoint]) {
        throw new Error(`API endpoint "${endpoint}" not found`);
    }

    return mergePaths(currentConfig.base, currentConfig.endpoints[endpoint]);
};
