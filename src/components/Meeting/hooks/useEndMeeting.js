import { useContext } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { MeetingContext } from '../components/MeetingContext';
import { getRoomStatuses } from '../helpers/getRoomStatuses';

export const useEndMeeting = () => {
    const { setMeeting } = useContext(MeetingContext);
    const { leave } = useMeeting();
    const statuses = getRoomStatuses();

    return () => {
        setMeeting('status', statuses.left);
        leave();
    };
};
