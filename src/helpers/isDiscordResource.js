export const isDiscordResource = (resource) => {
    const firstLink = (resource?.links || [])[0] || {};
    return firstLink.url === '#discord';
};
