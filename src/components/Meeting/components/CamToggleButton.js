import { useContext } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { Video, VideoOff } from 'lucide-react';
import { MeetingContext } from './MeetingContext';
import { ToggleButton } from './ToggleButton';

export const CamToggleButton = () => {
    const { meeting, setMeeting } = useContext(MeetingContext);
    const { enableWebcam, disableWebcam } = useMeeting();

    return (
        <ToggleButton
            components={{
                on: Video,
                off: VideoOff,
            }}
            value={meeting.camOn}
            onChange={() => {
                if (meeting.camOn) {
                    disableWebcam();
                } else {
                    enableWebcam();
                }
                setMeeting('camOn', !meeting.camOn);
            }}
        />
    );
};
