import { orderBy } from 'lodash';

export const parseResourceFeedbackOptions = (options) => {
    // Sorted for the feedback stats
    const order = [
        'only_vegan_products',
        'reduce_animal_products',
        'more_research',
        'no_impact',
    ];

    // Sorted by the backend (for feedback)
    const sortedOptions = orderBy(options, 'sortOrder', 'asc');

    const final = sortedOptions.reduce(
        (obj, item) => {
            const parsedItem = {
                ...item,
                type: item.key,
            };

            // Save by id
            const byId = {
                ...obj.byId,
                [item.id]: parsedItem,
            };

            // Save by type
            const byType = {
                ...obj.byType,
                [parsedItem.type]: parsedItem,
            };

            // Save all of them
            const all = [...obj.all, parsedItem];

            return {
                byId,
                byType,
                all,
            };
        },
        {
            byId: {},
            byType: {},
            all: [],
        }
    );

    return {
        ...final,
        ordered: order.map((value) => final.byType[value]),
    };
};
