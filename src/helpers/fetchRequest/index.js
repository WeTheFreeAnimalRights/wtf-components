import { camelizeObject } from '../camelizeObject';
import { getRequestObject } from './getRequestObject';

export const fetchRequest = async (requestConfig = {}) => {
    // Make the request object
    const { url, method, body } = getRequestObject(requestConfig);

    // Attach the object to be used for abortion
    const abortController = new AbortController();
    requestConfig._abortController = abortController;

    // Let's set the headers
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-TYpe', 'application/json');

    if (requestConfig.bearer) {
        headers.append('Authorization', `Bearer ${requestConfig.bearer}`);
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
    });

    // Parse the response
    let data;
    if (requestConfig.blob) {
        data = await response.blob();
    } else {
        // Parse the JSON
        data = await response.json();

        // Camelize it
        data = camelizeObject(data);
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
