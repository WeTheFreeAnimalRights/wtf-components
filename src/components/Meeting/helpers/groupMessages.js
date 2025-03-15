import { last } from 'lodash-es';

export const groupMessages = (list = [], userId) => {
    return list.reduce((result, item) => {
        // Get the last element
        const lastElement = last(result);

        // The item to be sent
        const finalItem = {
            ...item,
            type: item.payload?.type || 'message',
            resource: item.payload?.resource,
        };

        // If the last element has the same sender
        if (lastElement && lastElement.sender.id === String(item.senderId)) {
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
                    id: String(item.senderId),
                    name: item.senderName,
                },
                received: String(item.senderId) !== String(userId),
                texts: [finalItem],
            },
        ];
    }, []);
};
