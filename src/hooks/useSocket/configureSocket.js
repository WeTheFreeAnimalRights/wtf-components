import { configureEcho } from '@laravel/echo-react';
import { getCookie } from '../../helpers/fetchRequest/getCookie';

let socketConfigured = false;

const readEnvConfig = () => {
    if (typeof import.meta === 'undefined' || !import.meta.env) {
        return {};
    }

    const {
        VITE_REVERB_APP_KEY,
        VITE_REVERB_HOST,
        VITE_REVERB_PORT,
        VITE_REVERB_SCHEME,
        VITE_REVERB_AUTH_ENDPOINT,
    } = import.meta.env;

    return {
        key: VITE_REVERB_APP_KEY,
        wsHost: VITE_REVERB_HOST,
        wsPort: VITE_REVERB_PORT,
        wssPort: VITE_REVERB_PORT,
        authEndpoint: VITE_REVERB_AUTH_ENDPOINT,
        forceTLS: VITE_REVERB_SCHEME === 'https',
    };
};

export const buildSocketConfig = (config = {}) => {
    const cookieHeader = typeof document === 'undefined' ? '' : document.cookie;
    const xsrfToken =
        typeof document === 'undefined' ? '' : getCookie('XSRF-TOKEN');

    const merged = {
        broadcaster: 'reverb',
        cluster: '',
        encrypted: true,
        disableStats: true,
        auth: {
            headers: {
                Accept: 'application/json',
                Cookie: cookieHeader,
                'X-XSRF-TOKEN': xsrfToken,
            },
            withCredentials: true,
        },
        ...readEnvConfig(),
        ...config,
    };

    const required = ['key', 'wsHost'];
    const missing = required.filter((field) => !merged[field]);
    if (missing.length) {
        throw new Error(
            `Socket config missing required fields: ${missing.join(
                ', '
            )}. Pass them via buildSocketConfig({...}).`
        );
    }

    if (!merged.wsPort && !merged.wssPort) {
        throw new Error(
            'Socket config missing wsPort or wssPort. Provide at least one.'
        );
    }

    return merged;
};

export const configureSocket = (config = {}) => {
    if (socketConfigured || typeof window === 'undefined') {
        return;
    }

    const mergedConfig = buildSocketConfig(config);
    const authOverrides = config.auth || {};

    configureEcho({
        ...mergedConfig,
        auth: {
            ...mergedConfig.auth,
            ...authOverrides,
            headers: {
                ...mergedConfig.auth.headers,
                ...(authOverrides.headers || {}),
            },
        },
    });

    socketConfigured = true;
};
