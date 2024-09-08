import { useState } from 'react';
import { fetchRequest } from '../helpers/fetchRequest';

export const useFormSubmit = ({ requestObject, onSuccess, onError }) => {
    // Form statuses
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Submit method
    const formSubmit = async (values) => {
        try {
            // No error and is loading
            setError(false);
            setLoading(true);

            // Validate the code
            const data = await fetchRequest(requestObject(values));

            if (typeof onSuccess === 'function') {
                onSuccess(data);
            }
        } catch (error) {
            console.error(`Error in form submit:`, error);

            if (typeof onError === 'function') {
                onError(error);
            }

            // Set the error
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        formSubmit,
    };
};
