import { isFunction } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { PreloaderStates } from './PreloaderStates';
import { handleRequestConfig } from './helpers/handleRequestConfig';
import { currentLanguageState } from '../../recoilState';

/**
 * Fetches something and then runs a callback. While fetching, the preloader
 * is shown
 *
 * A request object looks like this:
 *  - url: String
 *  - callback({ data }): Function that gets called back when success happens
 */
export const Preloader = ({
    children,
    requests = [],
    refetch = [],
    className,
    render,
    loadingMessage,
    forcedLoading = false,

    // Extra properties
    onLoadingStateChanged,
    customPreloader,
    hasOutlet,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const languageCode = useRecoilValue(currentLanguageState);

    const usedRequests = requests.filter(Boolean);

    useEffect(() => {
        const fetchData = async () => {
            // Set the loading as true
            setLoading(true);

            // Loading state changed
            if (isFunction(onLoadingStateChanged)) {
                onLoadingStateChanged(true);
            }

            try {
                for (let requestConfig of usedRequests) {
                    await handleRequestConfig({
                        language: languageCode,
                        ...requestConfig,
                    });
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);

                // Loading state changed
                if (isFunction(onLoadingStateChanged)) {
                    onLoadingStateChanged(false);
                }
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
            loading={loading || forcedLoading}
            loadingMessage={loadingMessage}
            error={error}
            className={className}
            customPreloader={customPreloader}
            hasOutlet={hasOutlet}
        >
            {children}
        </PreloaderStates>
    );
};

Preloader.displayName = 'Preloader';
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
                 * Callback to handle the response (if any)
                 */
                callback: PropTypes.func.isRequired,
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
