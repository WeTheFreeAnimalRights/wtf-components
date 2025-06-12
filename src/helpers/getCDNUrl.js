export const getCDNUrl = (path = '', pullZone = 'common-wtf') => {
    const url = `https://${pullZone}.b-cdn.net`;
    const startsWithSlash = /^\//.test(path);
    return url + (startsWithSlash ? '' : '/') + path;
};
