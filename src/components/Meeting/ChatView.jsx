import { Fragment, useContext, useRef, useState } from 'react';
import { trim } from 'lodash-es';
import { CornerDownLeft, Plus, X } from 'lucide-react';
import { usePubSub } from '@videosdk.live/react-sdk';
import { Button } from '../Button';
import { groupMessages } from './helpers/groupMessages';
import { SpeechBubble } from './components/SpeechBubble';
import { MeetingContext } from './components/MeetingContext';
import { cn } from '_/lib/utils';
import { ResourcesChatPlugin } from './chat-plugins/ResourcesChatPlugin';
import { AutoScrollContainer } from '../AutoScrollContainer';
import { ChatPluginsList } from './chat-plugins/ChatPluginsList';
import { PromptsChatPlugin } from './chat-plugins/PromptsChatPlugin';
import { AutosizeTextarea } from '_/components/autosize-textarea';
import { useIsMobile } from '_/hooks/use-mobile';

export const ChatView = ({
    className,
    resources,
    plugins = ['resources'],
    prompts = [],
}) => {
    const { meeting } = useContext(MeetingContext);
    const { publish, messages } = usePubSub(`conversation-${meeting.id}`);
    const groupedMessages = groupMessages(messages, meeting.visitor.id);
    const [currentMessage, setCurrentMessage] = useState('');
    const [pluginsVisible, setPluginsVisible] = useState(false);
    const [selectedPlugin, setSelectedPlugin] = useState('');

    const isMobile = useIsMobile();

    const setInputMessage = (message = '') => {
        setCurrentMessage(message);

        // Focus on the input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const sendMessage = (message, resource = null, type = 'message') => {
        publish(trim(message), { persist: true }, { type, resource }, null);
        setInputMessage('');
    };

    const inputRef = useRef();

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
                    sendMessage(currentMessage);
                }}
                className={cn(
                    'flex flex-row items-center gap-2 mt-4 relative px-12'
                )}
            >
                {plugins.length > 0 && (
                    <Button
                        variant="gray"
                        size="small-icon"
                        type="button"
                        className="absolute start-1 bottom-1"
                        onClick={() => {
                            setPluginsVisible(!pluginsVisible);
                            setSelectedPlugin('');
                            if (pluginsVisible && inputRef.current) {
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
                            // On mobile: Shift+Enter sends message, Enter adds a new line
                            if (event.key === 'Enter' && event.shiftKey) {
                                event.preventDefault();
                                sendMessage(event.target.value);
                            } else if (
                                event.key === 'Enter' &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                setCurrentMessage((prev) => prev + '\n');
                            }
                        } else {
                            // On desktop: Enter sends message, Shift+Enter adds a new line
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                sendMessage(event.target.value);
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

            {pluginsVisible && plugins.length > 0 && (
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
