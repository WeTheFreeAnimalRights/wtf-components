import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
    const localIp = process.env.VITE_SSL_LOCAL_IP;
    const certPath = process.env.VITE_SSL_CERT;
    const keyPath = process.env.VITE_SSL_KEY;

    const backendUrl = process.env.VITE_BACKEND_URL;
    const reverbUrl = process.env.VITE_REVERB_URL;
    const localDomain = process.env.VITE_LOCAL_DOMAIN;

    let httpsOptions = false;
    let hmrOptions = undefined;

    if (certPath && keyPath) {
        httpsOptions = {
            cert: fs.readFileSync(path.resolve(certPath)),
            key: fs.readFileSync(path.resolve(keyPath)),
        };
        hmrOptions = {
            protocol: 'ws', // not wss
            host: localIp || 'localhost',
            port: 5173,
        };
    }

    const proxyCoonfig = {
        target: backendUrl,
        changeOrigin: true,
        xfwd: true,
        // Make cookies valid for the dev origin
        cookieDomainRewrite: localDomain, // or '' to drop Domain and make it host-only
        cookiePathRewrite: '/', // normalize paths if backend sets something else
    };

    return {
        host: '0.0.0.0', // allow LAN access
        port: 5173,
        open: true,
        https: httpsOptions,
        proxy: {
            '/storage': { ...proxyCoonfig },
            '^/app/.*': {
                ...proxyCoonfig,
                rewriteWsOrigin: true,
                ws: true,
                target: reverbUrl, // Reverb server
            },
            '/broadcasting': { ...proxyCoonfig },
            '/api': { ...proxyCoonfig },
            '/sanctum': { ...proxyCoonfig },
            '/login': { ...proxyCoonfig },
            '/logout': { ...proxyCoonfig },
        },
        hmr: hmrOptions, // undefined = use Vite defaults
    };
};
