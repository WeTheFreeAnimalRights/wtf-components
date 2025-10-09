import { Fragment, useEffect, useRef, useState } from 'react';
import { trim } from 'lodash-es';
import { CornerDownLeft, Plus, X } from 'lucide-react';
import { Button } from '../Button';
import { groupMessages } from './helpers/groupMessages';
import { SpeechBubble } from './components/SpeechBubble';
import { ResourcesChatPlugin } from './chat-plugins/ResourcesChatPlugin';
import { AutoScrollContainer } from '../AutoScrollContainer';
import { ChatPluginsList } from './chat-plugins/ChatPluginsList';
import { PromptsChatPlugin } from './chat-plugins/PromptsChatPlugin';
import { hasOnScreenKeyboard } from '../../helpers/hasOnScreenKeyboard';
import { AutosizeTextarea } from '_/components/autosize-textarea';
import { useMeeting } from './hooks/useMeeting';
import { useIsMobile } from '_/hooks/use-mobile';
import { cn } from '_/lib/utils';

export const ChatView = ({
    className,
    resources,
    plugins = ['resources'],
    prompts = [],
}) => {
    const { meeting } = useMeeting();
    const { client } = meeting;
    const chat = client.getChatClient();
    const currentUser = client.getCurrentUserInfo();

    // Local history state (start with existing history)
    const [history, setHistory] = useState(() => {
        try {
            return chat.getHistory?.() || [];
        } catch (err) {
            console.error('chat.getHistory error:', err);
            return [];
        }
    });

    // Grouped view derived from local history
    const groupedMessages = groupMessages(history, currentUser.userId);

    const [currentMessage, setCurrentMessage] = useState('');
    const [pluginsVisible, setPluginsVisible] = useState(false);
    const [selectedPlugin, setSelectedPlugin] = useState('');

    const isMobile = useIsMobile();
    const inputRef = useRef();

    const setInputMessage = (message = '') => {
        setCurrentMessage(message);
        if (inputRef.current && !hasOnScreenKeyboard()) {
            inputRef.current.focus();
        }

        if (hasOnScreenKeyboard()) {
            setPluginsVisible(false);
            setSelectedPlugin('');
        }
    };

    const hasPlugins = plugins?.length > 0;

    const sendMessage = async (message, resource = null, type = 'message') => {
        const payload = {
            type,
            message: trim(message),
            resource,
        };

        try {
            await chat.sendToAll(JSON.stringify(payload));
        } catch (err) {
            console.error('chat.sendToAll error:', err);
        }
        setInputMessage('');
    };

    // Listen for incoming messages
    useEffect(() => {
        const handler = (msg) => {
            setHistory((prev) => [...prev, msg]);
        };

        client.on('chat-on-message', handler);

        return () => {
            try {
                client.off('chat-on-message', handler);
            } catch (err) {
                console.error('chat.off unsubscribe error:', err);
            }
        };
    }, [chat]);

    return (
        <div className={cn('flex flex-col flex-basis-0 h-full', className)}>
            <AutoScrollContainer className="flex-grow">
                {groupedMessages.map((item) => (
                    <Fragment key={`message-${item.id}`}>
                        {item.texts.map((text, index) => (
                            <SpeechBubble
                                className={index === 0 ? 'mt-2' : 'mt-1'}
                                key={`text-${text.id}`}
                                received={item.received}
                                tail={index === item.texts.length - 1}
                                author={
                                    item.received &&
                                    item.sender.name &&
                                    index === item.texts.length - 1
                                }
                                timestamp={text.timestamp}
                                item={text}
                            >
                                {text.message}
                            </SpeechBubble>
                        ))}
                    </Fragment>
                ))}
            </AutoScrollContainer>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (trim(currentMessage).length > 0) {
                        sendMessage(currentMessage);
                    }
                }}
                className={cn(
                    'flex flex-row items-center gap-2 mt-4 relative ps-12 pe-12',
                    !hasPlugins && 'ps-0'
                )}
            >
                {hasPlugins && (
                    <Button
                        variant="gray"
                        size="small-icon"
                        type="button"
                        className="absolute start-1 bottom-1"
                        onClick={() => {
                            setPluginsVisible(!pluginsVisible);
                            setSelectedPlugin('');
                            if (
                                pluginsVisible &&
                                inputRef.current &&
                                !hasOnScreenKeyboard()
                            ) {
                                inputRef.current.focus();
                            }
                        }}
                    >
                        {pluginsVisible ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                    </Button>
                )}

                <AutosizeTextarea
                    ref={inputRef}
                    className="flex-grow"
                    value={currentMessage}
                    maxLength={255}
                    minHeight={26}
                    maxHeight={150}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    autoFocus
                    onFocus={() => {
                        setPluginsVisible(false);
                        setSelectedPlugin('');
                    }}
                    onKeyDown={(event) => {
                        if (isMobile) {
                            // Mobile: Shift+Enter sends, Enter = newline
                            if (event.key === 'Enter' && event.shiftKey) {
                                event.preventDefault();
                                if (trim(event.target.value).length > 0) {
                                    sendMessage(event.target.value);
                                }
                            } else if (
                                event.key === 'Enter' &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                setCurrentMessage((prev) => prev + '\n');
                            }
                        } else {
                            // Desktop: Enter sends, Shift+Enter = newline
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                if (trim(event.target.value).length > 0) {
                                    sendMessage(event.target.value);
                                }
                            } else if (
                                event.key === 'Enter' &&
                                event.shiftKey
                            ) {
                                event.preventDefault();
                                setCurrentMessage((prev) => prev + '\n');
                            }
                        }
                    }}
                />

                <Button
                    variant="simple"
                    size="small-icon"
                    type="submit"
                    className="absolute end-1 bottom-1"
                >
                    <CornerDownLeft className="w-4 h-4" />
                </Button>
            </form>

            {pluginsVisible && hasPlugins && (
                <div className="p-4 bg-muted mt-4 rounded-md">
                    {!selectedPlugin && (
                        <ChatPluginsList onSelect={setSelectedPlugin} />
                    )}

                    {selectedPlugin === 'resources' && (
                        <ResourcesChatPlugin
                            resources={resources}
                            onSelect={(resource) =>
                                sendMessage(
                                    'resource sent',
                                    resource,
                                    'resource'
                                )
                            }
                            onCancel={() => {
                                setPluginsVisible(false);
                                setSelectedPlugin('');
                            }}
                        />
                    )}

                    {selectedPlugin === 'prompts' && prompts?.length > 0 && (
                        <PromptsChatPlugin
                            onSelect={setInputMessage}
                            onCancel={() => {
                                setPluginsVisible(false);
                                setSelectedPlugin('');
                            }}
                            items={prompts}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
