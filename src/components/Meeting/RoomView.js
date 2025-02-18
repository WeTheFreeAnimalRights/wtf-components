import { useContext } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from './components/ParticipantView';
import { useTranslations } from '../../hooks/useTranslations';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import { Button } from '../Button';
import { cn } from '_/lib/utils';
import { MeetingContext } from './components/MeetingContext';

export const RoomView = () => {
    const { t } = useTranslations();
    const { meeting, setMeeting } = useContext(MeetingContext);
    const statuses = getRoomStatuses();

    // Get the method which will be used to join the meeting.
    // We will also get the participants list to display all participants
    const {
        join,
        participants,
        // muteMic,
        // unmuteMic,
        // enableWebcam,
        // disableWebcam,
    } = useMeeting({
        onMeetingJoined: () => {
            setMeeting('status', statuses.joined);
        },
    });
    const joinMeeting = () => {
        setMeeting('status', statuses.joining);
        join();
    };

    const participantKeys = [...participants.keys()];

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden">
            {meeting.status === statuses.joined && (
                <>
                    <div
                        className={cn(
                            'grid gap-4 h-full place-items-center bg-gray-100 dark:bg-black p-4',
                            [
                                participantKeys.length === 1 && 'grid-cols-1',
                                participantKeys.length === 2 && 'grid-cols-2',
                                participantKeys.length === 3 && 'grid-cols-3',
                                participantKeys.length === 4 && 'grid-cols-2',
                                participantKeys.length > 4 && 'grid-cols-3',
                            ]
                        )}
                    >
                        {participantKeys.map((participantId) => (
                            <ParticipantView
                            key={`participant-${participantId}`}
                                id={participantId}
                            />
                        ))}
                    </div>
                </>
            )}
            {(meeting.status === statuses.joining ||
                (meeting.status !== statuses.joined && meeting.autoJoin)) && (
                <p>{t('meeting-joining')}</p>
            )}
            {meeting.status === statuses.disconnected && !meeting.autoJoin && (
                <Button onClick={joinMeeting}>{t('meeting-join')}</Button>
            )}
        </div>
    );
};
