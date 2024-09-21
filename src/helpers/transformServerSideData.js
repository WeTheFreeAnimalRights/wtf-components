import { camelizeObject } from './camelizeObject';

export const transformServerSideData = (serverData = []) => {
    const byId = {};
    const options = [];
    const _server = serverData;

    serverData.forEach((item) => {
        const camelized = camelizeObject(item);

        // Save by id
        byId[camelized.id] = camelized;

        // Make the options (for select)
        options.push({
            value: camelized.id.toString(),
            label: camelized.name,
        });
    });

    return {
        byId,
        options,
        _server,
    };
};
