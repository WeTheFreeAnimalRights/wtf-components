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
    return response.json();
};
