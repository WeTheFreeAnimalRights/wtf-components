export const getChatBotConversationRequestObject = ({
    name,
    email,
    locale,
    platform,
    body = {},
    analyticsId,
    ...requestConfig
} = {}) => {
    return {
        url: 'chatBotConversations',
        api: 'public',
        method: 'post',
        body: {
            visitor_name: name,
            visitor_email: email,
            locale,
            platform,
            analytics_event_id: analyticsId,
            ...body,
        },
        ...requestConfig,
    };
};
