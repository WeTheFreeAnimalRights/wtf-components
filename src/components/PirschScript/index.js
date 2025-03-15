import { isFunction } from 'lodash-es';
import { useEffect } from 'react';

export const PirschScript = ({ code }) => {
    const { REACT_APP_ENV } = process.env;

    if (REACT_APP_ENV !== 'production') {
        return null;
    }

    const handleReadyStateChange = () => {
        if (
            document.readyState === 'complete' &&
            isFunction(window.pirschInit)
        ) {
            console.log('Pirsch Initialized', code);
            window.pirschInit();
        }
    };

    useEffect(() => {
        if (!document.getElementById('pianjs')) {
            const snippet = document.createElement('script');
            snippet.src = 'https://api.pirsch.io/pa.js';
            snippet.id = 'pianjs';
            snippet.setAttribute('data-code', code);

            // Add the snippet to the site and init Pirsch.
            document.body.appendChild(snippet);
            document.addEventListener(
                'readystatechange',
                handleReadyStateChange
            );

            return () => {
                document.removeEventListener(
                    'readystatechange',
                    handleReadyStateChange
                );
            };
        }
    }, [code]);

    return null;
};
