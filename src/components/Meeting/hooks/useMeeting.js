import { useContext } from 'react';
import { MeetingContext } from '../components/MeetingContext';

export const useMeeting = () => {
    return useContext(MeetingContext);
};
