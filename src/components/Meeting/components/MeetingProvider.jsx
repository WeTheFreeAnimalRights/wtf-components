import { useEffect, useState } from 'react';
import ZoomVideo from '@zoom/videosdk';
import { useTranslations } from '../../../hooks/useTranslations';
import { useMeeting } from '../hooks/useMeeting';
import { RoomView } from './RoomView';
import { cn } from '_/lib/utils';

export const MeetingProvider = ({ children, className }) => {
    const { meeting, setMeeting } = useMeeting();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslations();

    useEffect(() => {
        const client = ZoomVideo.createClient();
        const connect = async () => {
            await client.init('en-US', 'CDN', { patchJsMedia: true });
            await client.join(
                meeting.auth.meetingNumber,
                meeting.auth.signature,
                meeting.auth.userName,
                meeting.auth.passwword,
            );

            setMeeting('client', client);
            setLoading(false);
        };
        connect();
        return () => {
            client.leave();
        };
    }, []);

    if (loading) {
        return <RoomView className={cn('h-dvh', className)} users={[]} loadingMessage={t('connecting')} />;
    }

    return children;
};

MeetingProvider.displayName = 'MeetingProvider';
