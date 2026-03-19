import { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { trim } from 'lodash-es';
import { CornerDownLeft } from 'lucide-react';
import { cn } from '_/lib/utils';
import { useIsMobile } from '_/hooks/use-mobile';
import { AutosizeTextarea } from '_/components/autosize-textarea';
import { hasOnScreenKeyboard } from '../../helpers/hasOnScreenKeyboard';
import { useChatBot } from '../../hooks/useChatBot';
import { AutoScrollContainer } from '../AutoScrollContainer';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';
import { SpeechBubble } from '../Meeting/components/SpeechBubble';
import { useTranslations } from '../../hooks/useTranslations';
import { Resource } from '../Resource';
import { getResourceUrl } from '../../helpers/getResourceUrl';
import { groupChatBotMessages } from './helpers/groupChatBotMessages';

const getConversationResources = (messages = []) => {
    const resourcesMap = new Map();

    messages.forEach((message) => {
        if (!Array.isArray(message.resources)) {
            return;
        }

        message.resources.forEach((resource, index) => {
            const key =
                resource.id ||
                resource.slug ||
                resource.url ||
                `${message.id || message.createdAt || 'resource'}-${index}`;

            if (!resourcesMap.has(key)) {
                resourcesMap.set(key, resource);
            }
        });
    });

    return Array.from(resourcesMap.values());
};

export const ChatBot = ({
    name,
    email,
    platform,
    visible = true,
    endRequested = false,
    className,
    placeholder,
    emptyTitle,
    emptyMessage,
    loadingMessage,
    assistantLabel,
    autoStart = true,
    onConversationStarted,
    onConversationStartError,
    onMessageSent,
}) => {
    const {
        conversation,
        conversationId,
        messages,
        start,
        sendMessage,
        endConversation,
        loading,
        error,
        sendingMessage,
        endingConversation,
    } = useChatBot();
    const { t, currentLanguage } = useTranslations();
    const [currentMessage, setCurrentMessage] = useState('');
    const [conversationEnded, setConversationEnded] = useState(false);
    const [endedConversationResources, setEndedConversationResources] =
        useState([]);
    const inputRef = useRef(null);
    const startedRef = useRef('');
    const previousVisibleRef = useRef(visible);
    const previousEndRequestedRef = useRef(endRequested);
    const isMobile = useIsMobile();
    const finalPlaceholder = placeholder || t('chatbot-placeholder');
    const finalEmptyTitle = emptyTitle || t('chatbot-empty-title');
    const finalEmptyMessage = emptyMessage || t('chatbot-empty-message');
    const finalLoadingMessage =
        loadingMessage || t('chatbot-loading-conversation');
    const finalAssistantLabel = assistantLabel || t('chatbot-assistant-label');
    const thinkingLabel = t('chatbot-thinking');
    const locale = currentLanguage?.code;

    const groupedMessages = groupChatBotMessages(messages);
    const sharedResources = getConversationResources(messages);
    const conversationLabel =
        conversation?.data?.name || conversation?.name || finalAssistantLabel;

    useEffect(() => {
        if (!visible || !autoStart || !name || !locale || !platform) {
            return;
        }

        const startKey = JSON.stringify([name, email, locale, platform]);
        if (startedRef.current === startKey) {
            return;
        }

        startedRef.current = startKey;
        setConversationEnded(false);
        setEndedConversationResources([]);
        start(
            { name, email, locale, platform },
            onConversationStartError,
            onConversationStarted
        );
    }, [
        autoStart,
        email,
        locale,
        name,
        onConversationStartError,
        onConversationStarted,
        platform,
        visible,
    ]);

    useEffect(() => {
        const becameHidden = previousVisibleRef.current && !visible;

        if (
            becameHidden &&
            conversationId &&
            !conversationEnded &&
            !endingConversation
        ) {
            endConversation(conversationId, false, () => {
                setConversationEnded(true);
                setEndedConversationResources(sharedResources);
            });
        }

        previousVisibleRef.current = visible;
    }, [
        visible,
        conversationId,
        conversationEnded,
        endingConversation,
        sharedResources,
    ]);

    useEffect(() => {
        const becameEndRequested =
            !previousEndRequestedRef.current && endRequested;

        if (
            becameEndRequested &&
            conversationId &&
            !conversationEnded &&
            !endingConversation
        ) {
            endConversation(conversationId, false, () => {
                setConversationEnded(true);
                setEndedConversationResources(sharedResources);
            });
        }

        previousEndRequestedRef.current = endRequested;
    }, [
        endRequested,
        conversationId,
        conversationEnded,
        endingConversation,
        sharedResources,
    ]);

    useEffect(() => {
        if (
            conversationId &&
            visible &&
            !conversationEnded &&
            inputRef.current &&
            !hasOnScreenKeyboard()
        ) {
            inputRef.current.focus();
        }
    }, [conversationId, visible, conversationEnded]);

    const submitMessage = async (message) => {
        const finalMessage = trim(message);

        if (!conversationId || !finalMessage) {
            return;
        }

        await sendMessage(
            finalMessage,
            conversationId,
            false,
            (sentMessage) => {
                setCurrentMessage('');

                if (inputRef.current && !hasOnScreenKeyboard()) {
                    inputRef.current.focus();
                }

                if (typeof onMessageSent === 'function') {
                    onMessageSent(sentMessage);
                }
            }
        );
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={cn('flex flex-col flex-basis-0 h-full', className)}>
            {endingConversation && (
                <div className="fixed left-0 right-0 top-0 bottom-0 rounded-lg bg-background/75 z-[100] flex flex-col items-center justify-center">
                    <Spinner />
                </div>
            )}

            <div className="flex-grow min-h-0">
                {conversationEnded ? (
                    <AutoScrollContainer className="flex-grow h-full">
                        <div className="space-y-4 px-3 py-2">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {t('chatbot-ended-title')}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {t('chatbot-ended-description')}
                                </p>
                            </div>

                            {endedConversationResources.length > 0 ? (
                                <div className="space-y-3">
                                    {endedConversationResources.map(
                                        (resource, index) => (
                                            <Resource
                                                key={
                                                    resource.id ||
                                                    resource.slug ||
                                                    resource.url ||
                                                    `resource-${index}`
                                                }
                                                title={resource.title}
                                                image={
                                                    resource.image ||
                                                    resource.imageUrl
                                                }
                                                description={
                                                    resource.description
                                                }
                                                layout="horizontal"
                                                className="mb-4 last:mb-0"
                                                onClick={() => {
                                                    if (!resource?.links?.[0]) {
                                                        return;
                                                    }

                                                    window.open(
                                                        getResourceUrl(resource),
                                                        '_blank',
                                                        'noopener,noreferrer'
                                                    );
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <Empty
                                    hideIcon
                                    className="text-muted-foreground"
                                >
                                    {t('chatbot-ended-empty-resources')}
                                </Empty>
                            )}
                        </div>
                    </AutoScrollContainer>
                ) : loading && groupedMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <Spinner className="mx-auto" />
                            <div className="mt-3 text-sm text-muted-foreground">
                                {finalLoadingMessage}
                            </div>
                        </div>
                    </div>
                ) : error && !conversationId ? (
                    <Alert variant="destructive">{error}</Alert>
                ) : (
                    <AutoScrollContainer className="flex-grow h-full">
                        {groupedMessages.length === 0 ? (
                            <Empty
                                title={finalEmptyTitle}
                                hideIcon
                                className="text-muted-foreground"
                            >
                                {finalEmptyMessage}
                            </Empty>
                        ) : (
                            groupedMessages.map((item) => (
                                <Fragment
                                    key={`message-${item.id || `${item.role}-${item.texts[0]?.timestamp || 'no-time'}`}`}
                                >
                                    {item.texts.map((text, index) => {
                                        const lastTextMessageIndex = item.texts
                                            .map((_text, textIndex) => ({
                                                type: _text.type,
                                                index: textIndex,
                                            }))
                                            .filter(
                                                (_text) =>
                                                    _text.type === 'message'
                                            )
                                            .pop()?.index;
                                        const authorIndex =
                                            lastTextMessageIndex ?? item.texts.length - 1;

                                        return (
                                        <SpeechBubble
                                            className={
                                                index === 0 ? 'mt-2' : 'mt-1'
                                            }
                                            key={`text-${text.id || `${item.role}-${text.timestamp || 'no-time'}-${index}`}`}
                                            received={item.received}
                                            truncate={!item.received}
                                            tail={
                                                index === item.texts.length - 1
                                            }
                                            author={
                                                item.received &&
                                                index === authorIndex
                                                    ? conversationLabel
                                                    : false
                                            }
                                            timestamp={text.timestamp}
                                            item={text}
                                        >
                                            {text.message}
                                        </SpeechBubble>
                                        );
                                    })}
                                </Fragment>
                            ))
                        )}

                        {sendingMessage && (
                            <SpeechBubble
                                className="mt-2"
                                received
                                tail
                                author={conversationLabel}
                                item={{
                                    type: 'message',
                                }}
                            >
                                <span className="inline-flex items-center gap-2 italic text-muted-foreground">
                                    <Spinner className="w-4 h-4" />
                                    {thinkingLabel}
                                </span>
                            </SpeechBubble>
                        )}
                    </AutoScrollContainer>
                )}
            </div>

            {error && conversationId && (
                <Alert variant="destructive" className="mt-4">
                    {error}
                </Alert>
            )}

            {!conversationEnded && (
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        submitMessage(currentMessage);
                    }}
                    className="flex flex-row items-center gap-2 mt-4 relative pe-12"
                >
                    <AutosizeTextarea
                        ref={inputRef}
                        className="flex-grow"
                        value={currentMessage}
                        maxLength={255}
                        minHeight={26}
                        maxHeight={150}
                        placeholder={finalPlaceholder}
                        disabled={
                            !conversationId ||
                            sendingMessage ||
                            endingConversation
                        }
                        onChange={(event) =>
                            setCurrentMessage(event.target.value)
                        }
                        autoFocus
                        onKeyDown={(event) => {
                            if (isMobile) {
                                if (event.key === 'Enter' && event.shiftKey) {
                                    event.preventDefault();
                                    submitMessage(event.target.value);
                                } else if (
                                    event.key === 'Enter' &&
                                    !event.shiftKey
                                ) {
                                    event.preventDefault();
                                    setCurrentMessage(
                                        (previous) => previous + '\n'
                                    );
                                }
                            } else if (
                                event.key === 'Enter' &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                submitMessage(event.target.value);
                            }
                        }}
                    />

                    <Button
                        variant="simple"
                        size="small-icon"
                        type="submit"
                        className="absolute end-1 bottom-1"
                        disabled={
                            !conversationId ||
                            sendingMessage ||
                            endingConversation
                        }
                    >
                        <CornerDownLeft className="w-4 h-4" />
                    </Button>
                </form>
            )}
        </div>
    );
};

ChatBot.displayName = 'ChatBot';

ChatBot.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    platform: PropTypes.string,
    visible: PropTypes.bool,
    endRequested: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    emptyTitle: PropTypes.string,
    emptyMessage: PropTypes.string,
    loadingMessage: PropTypes.string,
    assistantLabel: PropTypes.string,
    autoStart: PropTypes.bool,
    onConversationStarted: PropTypes.func,
    onConversationStartError: PropTypes.func,
    onMessageSent: PropTypes.func,
};
