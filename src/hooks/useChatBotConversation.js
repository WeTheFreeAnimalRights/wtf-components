import { useState } from 'react';
import { useRequest } from './useRequest';
import { getChatBotConversationRequestObject } from '../helpers/chatBot/getChatBotConversationRequestObject';
import { useAnalytics } from './useAnalytics';

export const useChatBotConversation = () => {
    const [conversation, setConversation] = useState(null);
    const { loading, error, setError, request } = useRequest();
    const { analytics } = useAnalytics();

    const startConversation = async (
        { name, email, locale, platform, body, ...requestConfig } = {},
        onError,
        onSuccess,
        onLoading
    ) => {
        const data = await request(
            getChatBotConversationRequestObject({
                name,
                email,
                locale,
                platform,
                body,
                analyticsId: analytics?.visitId || null,
                ...requestConfig,
            }),
            onError,
            (response) => {
                setConversation(response);

                if (typeof onSuccess === 'function') {
                    onSuccess(response);
                }
            },
            onLoading
        );

        return data;
    };

    return {
        conversation,
        setConversation,
        loading,
        error,
        setError,
        startConversation,
    };
};
