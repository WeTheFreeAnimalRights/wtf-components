import { isFunction } from 'lodash-es';
import { useState } from 'react';
import { fetchRequest } from '../helpers/fetchRequest';

export const useRequest = ({ loadingInit = false } = {}) => {
    // Form statuses
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(loadingInit);

    // Submit method
    const request = async (requestObject, onError, onSuccess, _request) => {
        let data = null;
        try {
            // No error and is loading
            setError(false);
            setLoading(true);

            // Fetch the request
            data = await fetchRequest(requestObject);

            // If it wasn't succesfull and there is a message, throw an error
            if (data?.success === false && data?.message) {
                throw new Error(data.message);
            }

            // If there is a success function
            if (isFunction(onSuccess)) {
                onSuccess(data);
            }
        } catch (error) {
            console.error(`Error in request`, error);

            if (isFunction(onError)) {
                onError(error, _request);
            }

            // Set the error
            setError(error.message);
        } finally {
            setLoading(false);
        }

        return data;
    };

    return {
        loading,
        error,
        setError,
        request,
    };
};
