import { useContext, useMemo } from 'react';
import { MeetingProvider as SdkMeetingProvider } from '@videosdk.live/react-sdk';
import { MeetingContext } from '../MeetingContext';

export const VideoSdkProvider = ({ children }) => {
    const { meeting } = useContext(MeetingContext);

    const meetingConfig = useMemo(
        () => ({
            meetingId: meeting.id,
            micEnabled: meeting.micOn,
            webcamEnabled: meeting.camOn,
            name: meeting.visitor.name,
            participantId: String(meeting.visitor.id),
            multiStream: false,
            meta: {
                email: meeting.visitor.email,
            },
            ...meeting.options,
        }),
        [meeting.id, meeting.visitor.id, meeting.camOn, meeting.micOn]
    );

    console.log('🔄 Re-rendering MeetingProvider...');
    console.log('📡 meeting.id:', meeting.id);

    return (
        <SdkMeetingProvider
            key={meeting.id}
            config={meetingConfig}
            token={meeting.token}
            joinWithoutUserInteraction={meeting.autoJoin}
        >
            {children}
        </SdkMeetingProvider>
    );
};
