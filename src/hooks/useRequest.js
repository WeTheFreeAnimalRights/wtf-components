import { useState } from 'react';
import { fetchRequest } from '../helpers/fetchRequest';

export const useRequest = ({ loadingInit = false } = {}) => {
    // Form statuses
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(loadingInit);

    // Submit method
    const request = async (requestObject, onError, onSuccess) => {
        let data = null;
        try {
            // No error and is loading
            setError(false);
            setLoading(true);

            // Fetch the request
            data = await fetchRequest(requestObject);

            // If there is a success function
            if (typeof onSuccess === 'function') {
                onSuccess(data);
            }
        } catch (error) {
            console.error(`Error in request`, error);

            if (typeof onError === 'function') {
                onError(error);
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
        request,
    };
};
