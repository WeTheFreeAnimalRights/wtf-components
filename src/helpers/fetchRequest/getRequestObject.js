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
        body = JSON.stringify(requestConfig.body);
    }

    // Form the method
    const method = requestConfig.method || 'GET';

    // Form the url
    let url = getUrl(requestConfig.url, requestConfig.api || 'public');
    if (typeof requestConfig.params === 'object') {
        const urlParams = new URLSearchParams();
        for (const param in requestConfig.params) {
            urlParams.set(param, requestConfig.params[param]);
        }
        url += '?' + urlParams.toString();
    }

    return new Request(url, {
        method,
        body,
    });
};
