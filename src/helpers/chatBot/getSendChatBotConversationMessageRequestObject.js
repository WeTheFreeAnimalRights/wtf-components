export const getSendChatBotConversationMessageRequestObject = ({
    conversationId,
    message,
    body = {},
    ...requestConfig
} = {}) => {
    return {
        url: 'chatBotConversations',
        api: 'public',
        method: 'post',
        segments: [conversationId, 'messages'],
        body: {
            message,
            ...body,
        },
        ...requestConfig,
    };
};
