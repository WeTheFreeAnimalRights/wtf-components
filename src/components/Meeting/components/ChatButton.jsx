import { useContext, useState, useEffect, forwardRef, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePubSub } from '@videosdk.live/react-sdk';
import { MeetingContext } from './MeetingContext';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import newMessageSound from '../../../resources/sounds/new-message.mp3';
import { cn } from '_/lib/utils';

// Use audio when new message comes
const messageSound = new Audio(newMessageSound);

export const ChatButton = forwardRef(
    ({ className, iconClassName, chatVisible, ...props }, ref) => {
        const { meeting } = useContext(MeetingContext);
        const [newMessages, setNewMessages] = useState(0);

        // Ref to always track latest chatVisible state inside the event handler
        const chatVisibleRef = useRef(chatVisible);

        useEffect(() => {
            chatVisibleRef.current = chatVisible;
        }, [chatVisible]); // Update ref whenever chatVisible changes

        usePubSub(`conversation-${meeting.id}`, {
            onMessageReceived: () => {
                if (!chatVisibleRef.current) {
                    setNewMessages((value) => {
                        messageSound
                            .play()
                            .catch((error) =>
                                console.error('Error playing sound:', error)
                            );
                        return value + 1;
                    });
                }
            },
        });

        useEffect(() => {
            if (!chatVisible) {
                setNewMessages(0);
            }
        }, [chatVisible]);

        return (
            <Button ref={ref} className={cn('relative', className)} {...props}>
                {newMessages > 0 && (
                    <Badge className="absolute end-0 top-0 translate-x-1/3 -translate-y-1/3">
                        {newMessages}
                    </Badge>
                )}
                <MessageCircle className={iconClassName} />
            </Button>
        );
    }
);
