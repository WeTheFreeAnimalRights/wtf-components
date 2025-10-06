import { useEffect, useState } from 'react';
import ZoomVideo from '@zoom/videosdk';
import { useTranslations } from '../../../hooks/useTranslations';
import { useMeeting } from '../hooks/useMeeting';
import { RoomView } from './RoomView';

export const MeetingProvider = ({ children }) => {
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
        return <RoomView users={[]} loadingMessage={t('connecting')} />;
    }

    return children;
};

MeetingProvider.displayName = 'MeetingProvider';
