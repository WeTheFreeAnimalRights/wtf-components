import { useEffect, useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from './ParticipantView';
import { useTranslations } from '../../hooks/useTranslations';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import { Button } from '../Button';
import { cn } from '_/lib/utils';
import { isFunction } from 'lodash-es';

export const RoomView = ({
    id,
    autoJoin,
    status,
    onStatusChange,
    micOn,
    cameraOn,
}) => {
    const { t } = useTranslations();
    const statuses = getRoomStatuses();

    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    const {
        join,
        participants,
        muteMic,
        unmuteMic,
        enableWebcam,
        disableWebcam,
    } = useMeeting({
        //callback for when meeting is joined successfully
        onMeetingJoined: () => {
            if (isFunction(onStatusChange)) {
                onStatusChange(statuses.joined);
            }
        },
    });
    const joinMeeting = () => {
        if (isFunction(onStatusChange)) {
            onStatusChange(statuses.joining);
        }
        join();
    };

    // Microphone
    useEffect(() => {
        if (micOn) {
            unmuteMic();
        } else {
            muteMic();
        }
    }, [micOn]);

    // Camera
    useEffect(() => {
        if (cameraOn) {
            enableWebcam();
        } else {
            disableWebcam();
        }
    }, [cameraOn]);

    const participantKeys = [...participants.keys()];

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden">
            {status === statuses.joined && (
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
                                id={participantId}
                                key={participantId}
                            />
                        ))}
                    </div>
                </>
            )}
            {(status === statuses.joining ||
                (status !== statuses.joined && autoJoin)) && (
                <p>{t('meeting-joining')}</p>
            )}
            {status === statuses.disconnected && !autoJoin && (
                <Button onClick={joinMeeting}>{t('meeting-join')}</Button>
            )}
        </div>
    );
};
