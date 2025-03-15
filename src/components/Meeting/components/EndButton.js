import { useContext } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { LogOut } from 'lucide-react';
import { MeetingContext } from './MeetingContext';
import { Button } from '../../Button';
import { getRoomStatuses } from '../helpers/getRoomStatuses';

export const EndButton = () => {
    const { setMeeting } = useContext(MeetingContext);
    const { leave } = useMeeting();
    const statuses = getRoomStatuses();

    return (
        <Button
            variant="gray"
            onClick={() => {
                setMeeting('status', statuses.left);
                leave();
            }}
        >
            <LogOut className="w-4 h-4" />
        </Button>
    );
};
