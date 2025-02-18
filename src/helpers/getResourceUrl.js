export const getResourceUrl = (resource) => {
    const link = resource.links[0];

    switch (link.type) {
        case 'netflix':
            return `https://www.netflix.com/watch/${link.url}`;
        case 'amazon':
            return `https://www.amazon.com/gp/video/detail/${link.url}`;
        case 'youtube':
            return `https://www.youtube.com/watch?v=${link.url}`;
        default:
            return link.url;
    }
};
