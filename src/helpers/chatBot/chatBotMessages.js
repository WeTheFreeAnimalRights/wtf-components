export const getChatBotConversationId = (conversation) => {
    return conversation?.data?.id || conversation?.id || null;
};

export const getChatBotConversationToken = (conversation) => {
    return conversation?.token;
};

export const getChatBotResponseData = (response) => {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (response?.data && typeof response.data === 'object') {
        return response.data;
    }

    return response;
};

export const normalizeChatBotMessage = (item = {}) => {
    const source = item?.data && !Array.isArray(item.data) ? item.data : item;

    if (!source || typeof source !== 'object') {
        return null;
    }

    return {
        id: source.id,
        role: source.role || 'assistant',
        content: source.content || source.message || '',
        createdAt: source.createdAt || source.created_at || null,
        resources: Array.isArray(source.resources)
            ? source.resources
            : source.resource
              ? [source.resource]
              : [],
    };
};

export const normalizeChatBotMessages = (response) => {
    const data = getChatBotResponseData(response);

    if (!Array.isArray(data)) {
        return [];
    }

    return data.map(normalizeChatBotMessage).filter(Boolean);
};

export const createLocalChatBotUserMessage = (content) => {
    return {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
    };
};

export const mergeChatBotResponseMessage = (
    currentMessages = [],
    localUserMessage,
    responseMessage
) => {
    const withoutLocalDuplicate = currentMessages.filter(
        (item) => item.id !== localUserMessage.id
    );

    if (!responseMessage) {
        return withoutLocalDuplicate;
    }

    const filteredMessages =
        responseMessage.id === undefined || responseMessage.id === null
            ? withoutLocalDuplicate
            : withoutLocalDuplicate.filter(
                  (item) => item.id !== responseMessage.id
              );

    return [...filteredMessages, localUserMessage, responseMessage];
};
