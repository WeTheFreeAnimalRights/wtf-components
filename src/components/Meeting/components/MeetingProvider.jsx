import { useEffect, useState } from 'react';
import ZoomVideo from '@zoom/videosdk'
import { useMeeting } from '../hooks/useMeeting';

export const MeetingProvider = ({ children }) => {
    const {meeting, setMeeting} = useMeeting();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const client = ZoomVideo.createClient();
        const connect = async () => {
            await client.init('en-US', 'CDN', { patchJsMedia: true });
            await client.join(meeting.id, meeting.token, meeting.visitor.name);

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
