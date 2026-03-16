import { useState } from 'react';
import { trim } from 'lodash-es';
import { useRequest } from './useRequest';
import { useChatBotConversation } from './useChatBotConversation';
import { getChatBotConversationMessagesRequestObject } from '../helpers/chatBot/getChatBotConversationMessagesRequestObject';
import { getEndChatBotConversationRequestObject } from '../helpers/chatBot/getEndChatBotConversationRequestObject';
import { getSendChatBotConversationMessageRequestObject } from '../helpers/chatBot/getSendChatBotConversationMessageRequestObject';
import {
    createLocalChatBotUserMessage,
    getChatBotConversationId,
    getChatBotResponseData,
    mergeChatBotResponseMessage,
    normalizeChatBotMessage,
    normalizeChatBotMessages,
} from '../helpers/chatBot/chatBotMessages';

export const useChatBot = () => {
    const [messages, setMessages] = useState([]);
    const {
        conversation,
        setConversation,
        loading: startingConversation,
        error: conversationError,
        setError: setConversationError,
        startConversation,
    } = useChatBotConversation();
    const {
        request: requestMessages,
        loading: loadingMessages,
        error: messagesError,
        setError: setMessagesError,
    } = useRequest();
    const {
        request: requestSendMessage,
        loading: sendingMessage,
        error: sendMessageError,
        setError: setSendMessageError,
    } = useRequest();
    const {
        request: requestEndConversation,
        loading: endingConversation,
        error: endConversationError,
        setError: setEndConversationError,
    } = useRequest();

    const start = async (config = {}, onError, onSuccess, onLoading) => {
        setMessages([]);

        const response = await startConversation(
            config,
            onError,
            false,
            onLoading
        );
        const conversationId = getChatBotConversationId(response);

        if (conversationId) {
            await fetchMessages(conversationId);
        }

        if (typeof onSuccess === 'function') {
            onSuccess(response);
        }

        return response;
    };

    const fetchMessages = async (
        conversationId = getChatBotConversationId(conversation),
        onError,
        onSuccess,
        onLoading
    ) => {
        if (!conversationId) {
            return [];
        }

        const response = await requestMessages(
            getChatBotConversationMessagesRequestObject({
                conversationId,
            }),
            onError,
            (data) => {
                const nextMessages = normalizeChatBotMessages(data);
                setMessages(nextMessages);

                if (typeof onSuccess === 'function') {
                    onSuccess(nextMessages, data);
                }
            },
            onLoading
        );

        return normalizeChatBotMessages(response);
    };

    const sendMessage = async (
        content,
        conversationId = getChatBotConversationId(conversation),
        onError,
        onSuccess,
        onLoading
    ) => {
        const message = trim(content);

        if (!conversationId || !message) {
            return null;
        }

        const localUserMessage = createLocalChatBotUserMessage(message);
        setMessages((currentMessages) => [
            ...currentMessages,
            localUserMessage,
        ]);

        const response = await requestSendMessage(
            getSendChatBotConversationMessageRequestObject({
                conversationId,
                message,
            }),
            (error, request) => {
                setMessages((currentMessages) =>
                    currentMessages.filter(
                        (item) => item.id !== localUserMessage.id
                    )
                );

                if (typeof onError === 'function') {
                    onError(error, request);
                }
            },
            (data) => {
                const nextMessage = normalizeChatBotMessage(
                    getChatBotResponseData(data)
                );

                setMessages((currentMessages) =>
                    mergeChatBotResponseMessage(
                        currentMessages,
                        localUserMessage,
                        nextMessage
                    )
                );

                if (typeof onSuccess === 'function') {
                    onSuccess(nextMessage, data);
                }
            },
            onLoading
        );

        return {
            sentMessage: localUserMessage,
            responseMessage: normalizeChatBotMessage(
                getChatBotResponseData(response)
            ),
        };
    };

    const reset = () => {
        setConversation(null);
        setMessages([]);
        setConversationError(false);
        setMessagesError(false);
        setSendMessageError(false);
        setEndConversationError(false);
    };

    const endConversation = async (
        conversationId = getChatBotConversationId(conversation),
        onError,
        onSuccess,
        onLoading
    ) => {
        if (!conversationId) {
            return null;
        }

        const response = await requestEndConversation(
            getEndChatBotConversationRequestObject({
                conversationId,
            }),
            onError,
            (data) => {
                reset();

                if (typeof onSuccess === 'function') {
                    onSuccess(data);
                }
            },
            onLoading
        );

        return response;
    };

    return {
        conversation,
        conversationId: getChatBotConversationId(conversation),
        messages,
        setMessages,
        start,
        fetchMessages,
        sendMessage,
        endConversation,
        reset,
        loading: startingConversation || loadingMessages,
        startingConversation,
        loadingMessages,
        sendingMessage,
        endingConversation,
        error:
            conversationError ||
            messagesError ||
            sendMessageError ||
            endConversationError,
        conversationError,
        messagesError,
        sendMessageError,
        endConversationError,
    };
};
