import { useContext } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { Mic, MicOff } from 'lucide-react';
import { MeetingContext } from './MeetingContext';
import { ToggleButton } from './ToggleButton';

export const MicToggleButton = () => {
    const { meeting, setMeeting } = useContext(MeetingContext);
    const { muteMic, unmuteMic } = useMeeting();

    return (
        <ToggleButton
            components={{
                on: Mic,
                off: MicOff,
            }}
            value={meeting.micOn}
            onChange={() => {
                if (meeting.micOn) {
                    muteMic();
                } else {
                    unmuteMic();
                }
                setMeeting('micOn', !meeting.micOn);
            }}
        />
    );
};
