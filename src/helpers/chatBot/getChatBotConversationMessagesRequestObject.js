export const getChatBotConversationMessagesRequestObject = ({
    conversationId,
    ...requestConfig
} = {}) => {
    return {
        url: 'chatBotConversations',
        api: 'public',
        method: 'get',
        segments: [conversationId, 'messages'],
        ...requestConfig,
    };
};
