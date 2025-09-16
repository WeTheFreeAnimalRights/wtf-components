import { last } from 'lodash-es';

export const groupMessages = (list = [], userId) => {
    return list.reduce((result, item) => {
        // Get the last element
        const lastElement = last(result);

        let data = {};
        try {
            data = JSON.parse(item.message);
        } catch (e) {
            console.error('Error decoding message:', e, item.message);
        }

        // The item to be sent
        const finalItem = {
            ...item,
            message: data?.message || '',
            type: data?.type || 'message',
            resource: data?.resource,
        };

        // If the last element has the same sender
        if (lastElement && lastElement.sender.id === item.sender.userId) {
            // Push the new text
            lastElement.texts.push(finalItem);
            return result;
        }

        // Otherwise return the array with a new message in there
        return [
            ...result,
            {
                id: item.id,
                sender: {
                    id: item.sender.userId,
                    name: item.sender.name,
                },
                received: item.sender.userId !== userId,
                texts: [finalItem],
            },
        ];
    }, []);
};
