export const parseLanguages = (data) => {
    return data.reduce(
        (obj, item) => ({
            ...obj,
            [item.code]: {
                ...item,
                sublabel: item.label,
                label: item.localizedLabel,
            },
        }),
        {}
    );
};
