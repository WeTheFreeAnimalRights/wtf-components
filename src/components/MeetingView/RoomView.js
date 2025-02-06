import { useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from './ParticipantView';
import { useTranslations } from '../../hooks/useTranslations';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import { Button } from '../Button';

export const RoomView = () => {
    const { t } = useTranslations();
    const statuses = getRoomStatuses();

    const [status, setStatus] = useState(statuses.disconnected);
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const { join, participants } = useMeeting({
        //callback for when meeting is joined successfully
        onMeetingJoined: () => {
            setStatus(statuses.joined);
        },
    });
    const joinMeeting = () => {
        setStatus(statuses.joining);
        join();
    };

    return (
        <div>
            {status === statuses.joined && (
                <div>
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            id={participantId}
                            key={participantId}
                        />
                    ))}
                </div>
            )}
            {status === statuses.joining && <p>{t('meeting-joining')}</p>}
            {status === statuses.disconnected && (
                <Button onClick={joinMeeting}>{t('meeting-join')}</Button>
            )}
        </div>
    );
};
