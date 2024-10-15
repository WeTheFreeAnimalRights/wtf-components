export const parseResourceFeedbackOptions = (options) => {
    return options.reduce(
        (obj, item) => {
            // Save by id
            const byId = {
                ...obj.byId,
                [item.id]: item,
            };

            // Save all of them
            const all = [...obj.all, item];

            return {
                byId,
                all,
            };
        },
        {
            byId: {},
            all: [],
        }
    );
};
