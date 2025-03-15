import { useState, useEffect, useCallback } from 'react';
import { isFunction } from 'lodash-es';
import { useRequest } from './useRequest'; // Import your existing hook

export const useLongRequest = ({
    interval = 5000,
    shouldStop,
    ...requestParams
}) => {
    const { request: baseRequest, loading, error } = useRequest(requestParams);
    const [polling, setPolling] = useState(false);

    const stopPolling = useCallback(() => {
        setPolling(false);
    }, []);

    const request = useCallback(
        async (...args) => {
            if (!polling) {
                setPolling(true);
            }

            const data = await baseRequest(...args); // Fetch data
            if (isFunction(shouldStop) && shouldStop(data)) {
                stopPolling(); // Stop polling if the function returns true
            }
            return data; // Return data for external use
        },
        [baseRequest, polling, stopPolling, shouldStop]
    );

    useEffect(() => {
        if (polling) {
            const poll = async () => {
                try {
                    const data = await baseRequest();
                    if (isFunction(shouldStop) && shouldStop(data)) {
                        stopPolling();
                    }
                } catch (err) {
                    console.error('Polling error:', err);
                }
            };

            poll(); // Run immediately

            const intervalId = setInterval(poll, interval);
            return () => clearInterval(intervalId);
        }
    }, [polling, baseRequest, interval, stopPolling, shouldStop]);

    return { request, loading: loading || polling, error, stopPolling };
};
