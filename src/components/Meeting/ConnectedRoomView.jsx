import { useEffect, useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { RoomView } from './components/RoomView';
import { InactivityGuardModal } from './components/InactivityGuardModal';
import { parseParticipants } from './helpers/parseParticipants';
import { useMeeting } from './hooks/useMeeting';
import { useMeetingLifecycle } from './hooks/useMeetingLifeCycle';

export const ConnectedRoomView = ({
    emptyMessage,
    onMeetingEnded,
    loadingMessage,
}) => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { client } = meeting;

    const [all, setAll] = useState([]);
    const [current, setCurrent] = useState(null);

    useMeetingLifecycle({
        onDisconnected: onMeetingEnded,
        onSessionClosed: onMeetingEnded,
        onSelfRemoved: onMeetingEnded,
        onReconnectEnd: onMeetingEnded,
    });

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

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden relative flex items-center justify-center">
            <RoomView
                users={all}
                currentUser={current}
                emptyMessage={emptyMessage}
                loadingMessage={loadingMessage}
            />

            <InactivityGuardModal />
        </div>
    );
};

ConnectedRoomView.displayName = 'ConnectedRoomView';
