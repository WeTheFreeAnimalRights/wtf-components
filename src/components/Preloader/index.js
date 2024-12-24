import { isFunction } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchRequest } from '../../helpers/fetchRequest';
import { PreloaderStates } from './PreloaderStates';

/**
 * Fetches something and then runs a callback. While fetching, the preloader
 * is shown
 *
 * A request object looks like this:
 *  - url: String
 *  - validateResponse({ data }): Function that validates the response
 *  - callback({ data }): Function that gets called back when success happens
 */
export const Preloader = ({
    children,
    requests = [],
    refetch = [],
    className,
    render,
    loadingMessage,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const usedRequests = requests.filter(Boolean);

    useEffect(() => {
        const fetchData = async () => {
            // Set the loading as true
            setLoading(true);

            let requestConfig;
            try {
                for (requestConfig of usedRequests) {
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
                    requestConfig.callback({ data });
                }
            } catch (error) {
                console.error(
                    `Error fetching data from url "${requestConfig.url}":`,
                    error
                );
                setError(error);

                // If there is a callback, let's call it
                if (isFunction(requestConfig.errorCallback)) {
                    requestConfig.errorCallback(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, refetch);

    // Perhaps there is a method on how to render
    if (isFunction(render)) {
        return render({ loading, error, className, children });
    }

    return (
        <PreloaderStates
            loading={loading}
            loadingMessage={loadingMessage}
            error={error}
            className={className}
        >
            {children}
        </PreloaderStates>
    );
};

Preloader.propTypes = {
    /**
     * An array of requests for the preloader to do at the same time. Once all of them get resolved, then the content is shown
     */
    requests: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.bool,
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
            }),
        ])
    ),

    /**
     * An array of items used by the react's `useEffect` to know whether to refetch all the supplied requests or not
     */
    refetch: PropTypes.array,

    /**
     * Redo how the rendering is done
     */
    render: PropTypes.func,
};

export { PreloaderStates } from './PreloaderStates';
export { PreloaderOutlet } from './PreloaderOutlet';
