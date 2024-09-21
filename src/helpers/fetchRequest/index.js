import { getRequestObject } from './getRequestObject';

export const fetchRequest = async (requestConfig = {}) => {
    // Make the request object
    const request = getRequestObject(requestConfig);

    // Attach the object to be used for abortion
    const abortController = new AbortController();
    requestConfig._abortController = abortController;

    // Let's set the headers
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (requestConfig.bearer) {
        headers['Authorization'] = `Bearer ${requestConfig.bearer}`;
    }

    // If there is a language being requested
    if (requestConfig.language) {
        headers['Accept-Language'] = requestConfig.language;
    }

    // Fetch
    const response = await fetch(request, {
        signal: abortController.signal,
        headers,
    });

    // Parse the response
    if (requestConfig.blob) {
        data = await response.blob();
    } else {
        data = await response.json();
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
