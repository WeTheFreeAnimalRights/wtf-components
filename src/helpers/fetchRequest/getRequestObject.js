import { each, isArray } from 'lodash';
import { getUrl } from './api/getUrl';
/**
 * Form the request object to be sent to the fetch method
 *
 * @param {Object} requestConfig
 *
 * @return {Request}
 */
export const getRequestObject = (requestConfig) => {
    // Form the body (if any)
    let body;
    if (requestConfig.body) {
        if (requestConfig.upload) {
            body = new FormData();
            each(requestConfig.body, (value, key) => {
                body.append(key, value);
            });
        } else {
            body = JSON.stringify(requestConfig.body);
        }
    }

    // Form the method
    const method = requestConfig.method || 'GET';

    // Form the url
    let url = getUrl(requestConfig.url, requestConfig.api || 'public');
    if (isArray(requestConfig.segments)) {
        // If there is any suffix to the url
        url += '/' + requestConfig.segments.join('/');
    }
    if (typeof requestConfig.params === 'object') {
        const urlParams = new URLSearchParams();
        for (const param in requestConfig.params) {
            const paramValue = requestConfig.params[param];
            if (isArray(paramValue)) {
                paramValue.forEach((paramItem) => {
                    urlParams.append(param + '[]', paramItem);
                });
            } else {
                urlParams.set(param, requestConfig.params[param]);
            }
        }
        url += '?' + urlParams.toString();
    }

    return {
        url,
        method,
        body,
    };
};
