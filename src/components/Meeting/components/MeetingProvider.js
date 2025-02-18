import { useContext } from "react";
import { MeetingProvider as SdkMeetingProvider } from '@videosdk.live/react-sdk';
import { MeetingContext } from "./MeetingContext";

export const MeetingProvider = ({
    children,
}) => {
    const { meeting } = useContext(MeetingContext);

    return (
        <SdkMeetingProvider
            config={{
                meetingId: meeting.id,
                micEnabled: meeting.micOn,
                webcamEnabled: meeting.camOn,
                name: meeting.visitor.name,
                participantId: meeting.visitor.id,
                meta: {
                    email: meeting.visitor.email,
                },
                ...meeting.options,
            }}
            token={meeting.token}
            joinWithoutUserInteraction={meeting.autoJoin}
        >
            {children}
        </SdkMeetingProvider>
    );
};
