export const getCDNUrl = (path = '') => {
    const url = 'https://mystats.b-cdn.net';
    const startsWithSlash = /^\//.test(path);
    return url + (startsWithSlash ? '' : '/') + path;
}
