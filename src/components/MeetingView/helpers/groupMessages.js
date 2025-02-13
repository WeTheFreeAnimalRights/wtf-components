import { last } from 'lodash-es';

export const groupMessages = (list = [], userId) => {
    return list.reduce((result, item) => {
        // Get the last element
        const lastElement = last(result);

        // If the last element has the same sender
        if (lastElement && lastElement.sender.id === String(item.senderId)) {
            // Push the new text
            lastElement.texts.push(item);
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
                received: !item.senderId !== String(userId),
                firstText: item,
                texts: [],
            },
        ];
    }, []);
};
