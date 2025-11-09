import { last } from 'lodash-es';
import { parseMessage } from './parseMessage';

export const groupMessages = (list = [], userId) => {
    return list.reduce((result, item) => {
        // Get the last element
        const lastElement = last(result);

        // Get the data
        const data = parseMessage(item);

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
