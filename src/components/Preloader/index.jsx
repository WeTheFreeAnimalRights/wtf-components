import { isFunction } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PreloaderStates } from './PreloaderStates';
import { handleRequestConfig } from './helpers/handleRequestConfig';
import { currentLanguageState } from '../../appState';
import { useGlobalValue } from '../../store/AppState';

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
    ignoreError = false,

    // Extra properties
    onLoadingStateChanged,
    customPreloader,
    customError,
    errorVideo,
    repeatUntil,
    renderChildren,
    repeatInterval = 1000,
    cancelUrl,
    _id,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const language = useGlobalValue(currentLanguageState);

    const usedRequests = requests.filter(Boolean);

    // For the `repeatUntil`
    const timeoutRef = useRef(null);
    const isMountedRef = useRef(true); // Tracks if the component is still mounted

    useEffect(() => {
        isMountedRef.current = true;

        const fetchData = async () => {
            // Stop early if unmounted
            if (!isMountedRef.current) {
                return;
            }

            // Saving the data for the repetition
            const data = [];

            // Set the loading as true
            setLoading(true);

            // Loading state changed
            if (isFunction(onLoadingStateChanged)) {
                onLoadingStateChanged(true);
            }

            try {
                for (let requestConfig of usedRequests) {
                    data.push(
                        await handleRequestConfig({
                            language: language.code,
                            ...requestConfig,
                        })
                    );
                }
            } catch (error) {
                setError(error);
            } finally {
                if (isFunction(repeatUntil) && !repeatUntil(data)) {
                    timeoutRef.current = setTimeout(fetchData, repeatInterval);
                } else {
                    // Set loading as false
                    setLoading(false);

                    // Loading state changed
                    if (isFunction(onLoadingStateChanged)) {
                        onLoadingStateChanged(false);
                    }
                }
            }
        };

        fetchData();

        return () => {
            // Set the loading to false
            setLoading(false);

            // Mark component as unmounted
            isMountedRef.current = false;

            // Clear the timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
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
            ignoreError={ignoreError}
            className={className}
            customPreloader={customPreloader}
            customError={customError}
            errorVideo={errorVideo}
            renderChildren={renderChildren}
            cancelUrl={cancelUrl}
            _id={_id}
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
            PropTypes.object,
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
