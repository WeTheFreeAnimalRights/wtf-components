import { Fragment, useState } from 'react';
import { usePubSub } from '@videosdk.live/react-sdk';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { groupMessages } from './helpers/groupMessages';
import { SpeechBubble } from './components/SpeechBubble';
import { CornerDownLeft } from 'lucide-react';

export const ChatView = ({
    id,
    userId,
    // onMessageReceived,
    // onOldMessagesReceived,
}) => {
    const convId = `conversation-${id}`;
    const { publish, messages } = usePubSub(convId, {
        onMessageReceived: (...args) => {
            console.log('>>mr args', args);
        },
        onOldMessagesReceived: (...args) => {
            console.log('>>omr args', args);
        },
    });
    const groupedMessages = groupMessages(messages, userId);

    const [currentMessage, setCurrentMessage] = useState('');

    const sendMessage = (message) => {
        console.log('sending', message);
        publish(message, { persist: true }, null, null);
        setCurrentMessage('');
    };

    return (
        <div className="flex flex-col flex-basis-0 h-full">
            <div className="flex-grow overflow-auto">
                {groupedMessages.map((item) => (
                    <Fragment key={`message-${item.id}`}>
                        <SpeechBubble
                            className="mt-2"
                            received={item.received}
                            tail={item.texts.length === 0}
                            author={item.received && item.sender.name}
                            timestamp={item.firstText.timestamp}
                        >
                            {item.firstText.message}
                        </SpeechBubble>
                        {item.texts.map((text, index) => (
                            <SpeechBubble
                                className="mt-1"
                                received={item.received}
                                tail={index === item.texts.length - 1}
                                timestamp={text.timestamp}
                                key={`text-${text.id}`}
                            >
                                {text.message}
                            </SpeechBubble>
                        ))}
                    </Fragment>
                ))}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(currentMessage);
                }}
                className="flex flex-row items-center gap-2 mt-4"
            >
                <TextInput
                    className="flex-grow"
                    value={currentMessage}
                    maxLength={255}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    autoFocus
                    innerRightContent={
                        <Button
                            variant="simple"
                            size="small-icon"
                            type="submit"
                        >
                            <CornerDownLeft className="w-4 h-4" />
                        </Button>
                    }
                />
            </form>
        </div>
    );
};
