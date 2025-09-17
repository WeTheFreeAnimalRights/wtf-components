import { useEffect, useState } from 'react';
import ZoomVideo from '@zoom/videosdk';
import { useMeeting } from '../hooks/useMeeting';

export const MeetingProvider = ({ children }) => {
    const { meeting, setMeeting } = useMeeting();
    const [loading, setLoading] = useState(true);

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
        return 'LLLLOOAADING';
    }

    return children;
};

MeetingProvider.displayName = 'MeetingProvider';
