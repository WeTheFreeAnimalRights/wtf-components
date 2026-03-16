import { last } from 'lodash-es';

const getChatBotMessageItems = (item) => {
    const texts = [];

    if (item.content) {
        texts.push({
            ...item,
            message: item.content,
            type: 'message',
            timestamp: item.createdAt,
        });
    }

    if (Array.isArray(item.resources)) {
        item.resources.forEach((resource, index) => {
            texts.push({
                ...item,
                id:
                    resource.id ||
                    `${item.id || item.createdAt || 'resource'}-${index}`,
                message: '',
                type: 'resource',
                resource,
                timestamp: item.createdAt,
            });
        });
    }

    return texts;
};

export const groupChatBotMessages = (list = [], userRole = 'user') => {
    return list.reduce((result, item) => {
        const role = item.role || 'assistant';
        const lastElement = last(result);
        const texts = getChatBotMessageItems(item);

        if (texts.length === 0) {
            return result;
        }

        if (lastElement && lastElement.role === role) {
            lastElement.texts.push(...texts);
            return result;
        }

        return [
            ...result,
            {
                id: item.id,
                role,
                received: role !== userRole,
                texts,
            },
        ];
    }, []);
};
