import { isFunction, isNull } from 'lodash-es';
import { camelizeObject } from '../camelizeObject';
import { getEmptyAuthToken } from '../getEmptyAuthToken';
import { globals } from '../globals';
import { getCookie } from './getCookie';
import { getRequestObject } from './getRequestObject';

export const fetchRequest = async (requestConfig = {}) => {
    // Make the request object
    const { url, method, body } = getRequestObject(requestConfig);

    // Extra fetch options
    const options = {
        ...(requestConfig.options || {}),
    };

    // Attach the object to be used for abortion
    const abortController = new AbortController();
    requestConfig._abortController = abortController;

    // Let's set the headers
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (requestConfig.bearer || requestConfig.auth) {
        options.credentials = 'include';

        if (
            requestConfig.bearer &&
            requestConfig.bearer !== getEmptyAuthToken()
        ) {
            headers.append('Authorization', `Bearer ${requestConfig.bearer}`);
        } else {
            headers.append('Referer', window.location.href);

            // if token already exists
            const token = getCookie('XSRF-TOKEN');
            if (token) {
                headers.append('X-XSRF-Token', token);
            }
        }
    }

    // If there is a language being requested
    if (requestConfig.language) {
        headers.append('Accept-Language', requestConfig.language);
    }

    // If there's a file to be uploaded, then remove the content type
    if (requestConfig.upload) {
        headers.delete('Content-Type');
    }

    // Fetch
    const response = await fetch(url, {
        signal: abortController.signal,
        method,
        headers,
        body,
        ...options,
    });

    // If there is a global callback
    const requestsCallback = globals.get('requestsCallback');
    if (isFunction(requestsCallback)) {
        requestsCallback(response, requestConfig);
    }

    // If there is an individual callback
    if (isFunction(requestConfig._callback)) {
        requestConfig._callback(response, requestConfig);
    }

    // Parse the response
    let data;
    if (requestConfig.blob) {
        data = await response.blob();
    } else {
        // 204 means success, but no content
        if (response.status !== 204) {
            // Parse the JSON
            data = isNull(response.body) ? null : await response.json();

            // Camelize it
            data = isNull(data) ? null : camelizeObject(data);
        }
    }

    // If the status code is bigger than 400, then probably an error
    if (response.status >= 400) {
        const error = new Error(
            data.message || `Request returned with code ${response.status}`
        );
        error.status = response.status;
        throw error;
    }

    return data;
};
