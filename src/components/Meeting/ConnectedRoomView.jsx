import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { useCountdown } from '../../hooks/useCountdown';
import { ErrorBoundary } from '../ErrorBoundary';
import { RoomView } from './components/RoomView';
import { InactivityGuardModal } from './components/InactivityGuardModal';
import { parseParticipants } from './helpers/parseParticipants';
import { useMeeting } from './hooks/useMeeting';
import { useMeetingLifecycle } from './hooks/useMeetingLifecycle';
import { useEndMeeting } from './hooks/useEndMeeting';
import { parseMessage } from './helpers/parseMessage';
import meetingEndedSound from '../../resources/sounds/meeting-end.mp3';
import { playAudio } from '../../helpers/playAudio';

// Preload the sound once (note: some browsers require a user gesture before audio can play)
const endSound = new Audio(meetingEndedSound);

export const ConnectedRoomView = ({
    emptyMessage,
    onMeetingEnded,
    loadingMessage,
    endingMessage,
    cameraOn,
}) => {
    const { t } = useTranslations();
    const { meeting, setMeeting } = useMeeting();
    const { client } = meeting;
    const { endMeeting } = useEndMeeting();
    const initialCameraSet = useRef(false);

    const [all, setAll] = useState([]);
    const [current, setCurrent] = useState(null);
    const [meetingEnded, setMeetingEnded] = useState(false);
    const [countdownActive, setCountdownActive] = useState(false);
    const previousUserCountRef = useRef(0);

    const {
        percent: countdownPercent,
        start: startCountdown,
        end: endCountdown,
    } = useCountdown(120, () => {
        endMeeting(() => {
            setCountdownActive(false);
        });
    });

    const handleMeetingEnded = useCallback(
        (payload) => {
            setMeetingEnded(true);
            if (onMeetingEnded) {
                onMeetingEnded(payload);
            }
        },
        [onMeetingEnded]
    );

    useMeetingLifecycle({
        onDisconnected: handleMeetingEnded,
        onSessionClosed: handleMeetingEnded,
        onSelfRemoved: handleMeetingEnded,
        onReconnectEnd: handleMeetingEnded,
    });

    useEffect(() => {
        if (initialCameraSet.current) {
            return;
        }
        if (typeof cameraOn === 'boolean') {
            setMeeting('camOn', cameraOn);
            initialCameraSet.current = true;
        }
    }, [cameraOn, setMeeting]);

    // Subscribe to incoming messages (to see if an end meeting was sent)
    useEffect(() => {
        const handleIncoming = (msg) => {
            try {
                const data = parseMessage(msg);
                if (data.type === 'end') {
                    handleMeetingEnded();
                    playAudio(endSound);
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
    }, []);

    useEffect(() => {
        if (!client) return;

        const reconcile = () => {
            const { all, current } = parseParticipants(meeting);
            setAll(all);
            setCurrent(current);
        };

        // Event handlers just trigger reconcile
        const onUserChange = () => reconcile();
        const onConnection = () => reconcile();

        // Initial populate
        reconcile();

        // Subscribe broadly
        client.on?.('user-added', onUserChange);
        client.on?.('user-removed', onUserChange);
        client.on?.('user-updated', onUserChange);
        client.on?.('connection-change', onConnection);

        // Lightweight periodic reconcile to catch silent refreshes
        const interval = setInterval(reconcile, 3000);

        return () => {
            client.off?.('user-added', onUserChange);
            client.off?.('user-removed', onUserChange);
            client.off?.('user-updated', onUserChange);
            client.off?.('connection-change', onConnection);
            clearInterval(interval);
        };
    }, [client]);

    useEffect(() => {
        const currentCount = all.length;
        const previousCount = previousUserCountRef.current;
        previousUserCountRef.current = currentCount;

        if (currentCount === 0 && previousCount > 0) {
            setCountdownActive(true);
            startCountdown();
            return;
        }

        if (currentCount !== 0 && previousCount === 0) {
            endCountdown();
            setCountdownActive(false);
        }
    }, [all.length, endCountdown, startCountdown]);

    useEffect(() => {
        if (!client || typeof client.leave !== 'function') {
            return undefined;
        }

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // Required for Chrome to show a confirmation dialog.
            event.returnValue = '';
        };

        const handlePageHide = () => {
            try {
                client.leave();
            } catch (err) {
                console.error('leave() error:', err);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            try {
                client.leave();
            } catch (err) {
                console.error('leave() error:', err);
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, [client]);

    if (meetingEnded) {
        return (
            <div className="col-span-3 flex-grow basis-0 overflow-hidden relative flex items-center justify-center">
                {t('meeting-ended')}
            </div>
        );
    }

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden relative flex items-center justify-center">
            <RoomView
                users={all}
                currentUser={current}
                emptyMessage={emptyMessage}
                loadingMessage={
                    countdownActive
                        ? endingMessage
                        : loadingMessage
                }
                countdownActive={countdownActive}
                countdownPercent={countdownPercent}
            />

            <ErrorBoundary>
                <InactivityGuardModal />
            </ErrorBoundary>
        </div>
    );
};

ConnectedRoomView.displayName = 'ConnectedRoomView';
