import { useContext, useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { useTranslations } from '../../hooks/useTranslations';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import { Button } from '../Button';
import { MeetingContext } from './components/MeetingContext';
import { RoomView } from './components/RoomView';
import { parseParticipants } from './helpers/parseParticipants';
import { Spinner } from '../Spinner';
import { Empty } from '../Empty';
import { isFunction } from 'lodash-es';

export const ConnectedRoomView = ({ emptyMessage, onMeetingLeft }) => {
    const { t } = useTranslations();
    const { meeting, setMeeting } = useContext(MeetingContext);
    const [joined, setJoined] = useState(false);
    const statuses = getRoomStatuses();

    const { join, participants } = useMeeting({
        onMeetingJoined: () => {
            setMeeting('status', statuses.joined);
            setJoined(true);
            console.log('✅ Successfully joined meeting');
        },
        onMeetingLeft: () => {
            setMeeting('status', statuses.left);
            setJoined(true);
            if (isFunction(onMeetingLeft)) {
                onMeetingLeft();
            }
        },
        onConnectionOpen: () => console.log('🔗 WebRTC Connection Open'),
        onConnectionClose: () => {
            setMeeting('status', statuses.disconnected);
            setJoined(true);
            console.log('❌ Connection Closed');
        },
        onError: (error) => console.error('🚨 VideoSDK Error:', error),
        onParticipantLeft: (participant) =>
            console.log(`👤 ${participant.name} left the meeting`),
    });
    const joinMeeting = () => {
        setMeeting('status', statuses.joining);
        join();
    };

    const users = parseParticipants(participants, meeting);

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden relative flex items-center justify-center">
            {meeting.status === statuses.joined && (
                <RoomView
                    users={users.all}
                    currentUser={users.current}
                    emptyMessage={emptyMessage}
                />
            )}
            {meeting.status === statuses.joining && (
                <div className="flex flex-col gap-2 items-center justify-center">
                    <Spinner />
                    <p className="text-gray-500">{t('meeting-joining')}</p>
                </div>
            )}
            {meeting.status === statuses.disconnected &&
                !meeting.autoJoin &&
                !joined && (
                    <Button onClick={joinMeeting}>{t('meeting-join')}</Button>
                )}
            {meeting.status === statuses.disconnected && joined && (
                <Empty onClick={joinMeeting} buttonLabel={t('meeting-join')}>
                    {t('meeting-disconnected')}
                </Empty>
            )}
            {meeting.status === statuses.left && (
                <Empty>{t('meeting-ended')}</Empty>
            )}
        </div>
    );
};
