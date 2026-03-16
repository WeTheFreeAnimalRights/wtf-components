export const getEndChatBotConversationRequestObject = ({
    conversationId,
    body = {},
    ...requestConfig
} = {}) => {
    return {
        url: 'chatBotConversations',
        api: 'public',
        method: 'put',
        segments: [conversationId, 'end'],
        body,
        ...requestConfig,
    };
};
