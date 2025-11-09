import { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import newMessageSound from '../../../resources/sounds/new-message.mp3';
import { cn } from '_/lib/utils';
import { useMeeting } from '../hooks/useMeeting';
import { parseMessage } from '../helpers/parseMessage';

// Preload the sound once (note: some browsers require a user gesture before audio can play)
const messageSound = new Audio(newMessageSound);

export const ChatButton = forwardRef(
    ({ className, iconClassName, chatVisible, ...props }, ref) => {
        const { meeting } = useMeeting();
        const { client } = meeting;

        const chat = useMemo(() => client.getChatClient(), [client]);
        const currentUser = useMemo(
            () => client.getCurrentUserInfo(),
            [client]
        );

        const [newMessages, setNewMessages] = useState(0);

        // Track messages we've seen to avoid double counting (across both event names)
        const seenKeysRef = useRef(new Set());

        // Seed "seen" with existing history so they don't count as new on mount
        useEffect(() => {
            try {
                const history = chat.getHistory?.() || [];
                for (const msg of history) {
                    const key = `${msg?.sender?.userId || ''}|${msg?.timestamp || ''}|${msg?.message || ''}`;
                    seenKeysRef.current.add(key);
                }
            } catch (err) {
                console.error('chat.getHistory error:', err);
            }
        }, [chat]);

        // Reset counter whenever chat becomes visible
        useEffect(() => {
            if (chatVisible) {
                setNewMessages(0);
            }
        }, [chatVisible]);

        // Subscribe to incoming messages
        useEffect(() => {
            const handleIncoming = (msg) => {
                try {
                    const key = `${msg?.sender?.userId || ''}|${msg?.timestamp || ''}|${msg?.message || ''}`;
                    if (seenKeysRef.current.has(key)) {
                        return;
                    }
                    seenKeysRef.current.add(key);

                    // Ignore messages from self for "new" count
                    const senderId = msg?.sender?.userId;
                    const isSelf =
                        senderId &&
                        currentUser?.userId &&
                        senderId === currentUser.userId;

                    // Get the data
                    const data = parseMessage(msg);

                    if (!chatVisible && !isSelf && !data.type === 'end') {
                        setNewMessages((n) => n + 1);

                        // Try to play the notification sound
                        try {
                            messageSound.currentTime = 0;
                            // Some browsers block autoplay without prior gesture; ignore failure
                            messageSound.play().catch(() => {});
                        } catch (err) {
                            console.error('messageSound play error:', err);
                        }
                    }
                } catch (err) {
                    console.error('handleIncoming error:', err);
                }
            };

            try {
                client.on('chat-on-message', handleIncoming);
            } catch (err) {
                console.error('chat.on subscribe error:', err);
            }

            return () => {
                try {
                    client.off('chat-on-message', handleIncoming);
                } catch (err) {
                    console.error('chat.off unsubscribe error:', err);
                }
            };
        }, [chat, chatVisible, currentUser?.userId]);

        return (
            <Button ref={ref} className={cn('relative', className)} {...props}>
                {newMessages > 0 && (
                    <Badge
                        variant="simple"
                        className="absolute end-0 top-0 translate-x-1/3 -translate-y-1/3"
                    >
                        {newMessages}
                    </Badge>
                )}
                <MessageCircle className={iconClassName} />
            </Button>
        );
    }
);

ChatButton.displayName = 'ChatButton';
