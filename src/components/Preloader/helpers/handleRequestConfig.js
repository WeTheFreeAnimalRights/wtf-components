import { isFunction } from 'lodash-es';
import { fetchRequest } from '../../../helpers/fetchRequest';

export const handleRequestConfig = async (config = {}) => {
    try {
        const data = await fetchRequest(config);

        // Callback (if any)
        if (isFunction(config.callback)) {
            return config.callback({ data });
        } else {
            return data;
        }
    } catch (error) {
        console.error(`Error fetching data from url "${config.url}":`, error);

        // If there is a callback, let's call it
        if (isFunction(config.errorCallback)) {
            config.errorCallback(error);
        }

        throw error;
    }
};
