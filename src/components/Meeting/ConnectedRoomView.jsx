import { useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import { Button } from '../Button';
import { RoomView } from './components/RoomView';
import { parseParticipants } from './helpers/parseParticipants';
import { Spinner } from '../Spinner';
import { Empty } from '../Empty';
import { isFunction } from 'lodash-es';
import { useMeeting } from './hooks/useMeeting';

export const ConnectedRoomView = ({ emptyMessage }) => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const {all, current} = parseParticipants(meeting);

    console.log('>>', all, current);

    return (
        <div className="col-span-3 flex-grow basis-0 overflow-hidden relative flex items-center justify-center">
            <RoomView
                users={all}
                currentUser={current}
                emptyMessage={emptyMessage}
            />
            {/* {meeting.status === statuses.joined && (
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
            )} */}
        </div>
    );
};
