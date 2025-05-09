export const parseResourceItem = (item = {}) => {
    const type = item.type.toLowerCase();

    return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        image: item.imageUrl,
        type,
        links: item.links.map((link) => ({
            type: link.type.toLowerCase(),
            url: link.url,
            forceOpenInNewTab: link.forceOpenInNewTab,
        })),
        highlighted: Boolean(item.isHighlighted),
        highlightedType:
            type === 'documentary' || type === 'video'
                ? 'movie'
                : type === 'challenge'
                  ? 'challenge'
                  : 'other',
        _raw: item,
    };
};
