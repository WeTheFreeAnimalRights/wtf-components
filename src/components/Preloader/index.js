import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert } from '../Alert';
import { Spinner } from '../Spinner';
import { fetchRequest } from '../../helpers/fetchRequest';
import { View } from 'react-native';

/**
 * Fetches something and then runs a callback. While fetching, the preloader
 * is shown
 *
 * A request object looks like this:
 *  - url: String
 *  - validateResponse({ data }): Function that validates the response
 *  - callback({ data }): Function that gets called back when success happens
 */
export const Preloader = ({ children, requests = [], refetch = [] }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Let's make the abort function (to stop all other requests)
        const abortAll = () => {
            for (const requestConfig of requests) {
                if (requestConfig._abortController) {
                    requestConfig._abortController.abort();
                }
            }
        };

        const fetchData = async () => {
            let requestConfig;
            try {
                for (requestConfig of requests) {
                    // Get the data
                    const data = await fetchRequest(requestConfig);

                    // Validate the response
                    if (
                        requestConfig.validateResponse &&
                        !requestConfig.validateResponse({ data })
                    ) {
                        throw new Error('invalid-data', data);
                    }

                    // Callback
                    requestConfig.callback({ data, abortAll });
                }
            } catch (error) {
                console.error(
                    `Error fetching data from url "${requestConfig.url}":`,
                    error
                );
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, refetch);

    if (loading) {
        return (
            <View className="flex justify-center items-center w-screen h-screen">
                <Spinner />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex justify-center items-center w-screen h-screen">
                <Alert theme="error" className="mb-4">
                    {error.message}
                </Alert>
            </View>
        );
    }

    return children;
};

Preloader.propTypes = {
    /**
     * An array of requests for the preloader to do at the same time. Once all of them get resolved, then the content is shown
     */
    requests: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Optional, which API to send the request to (depending on the setup apis)
             */
            api: PropTypes.string,

            /**
             * Which endpoint to send the request to
             */
            url: PropTypes.string.isRequired,

            /**
             * Which method to send the request with (default GET)
             *
             * @var {[type]}
             */
            method: PropTypes.string,

            /**
             * Set any get params for the request
             */
            params: PropTypes.object,

            /**
             * Which language to request
             */
            language: PropTypes.string,

            /**
             * Optional body text to send with the request
             */
            body: PropTypes.string,

            /**
             * Optional callback to validate the response coming from the API
             */
            validateResponse: PropTypes.func,

            /**
             * Optional callback to handle the response (if any)
             */
            callback: PropTypes.func,

            /**
             * This will be filled in by the request and will contain the abort controller (to cancel the request)
             *
             * @var {[type]}
             */
            _abortController: PropTypes.object,
        })
    ),

    /**
     * An array of items used by the react's `useEffect` to know whether to refetch all the supplied requests or not
     */
    refetch: PropTypes.array,
};
