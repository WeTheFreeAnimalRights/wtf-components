import { useTranslations } from '../../../hooks/useTranslations';
import { useRequest } from '../../../hooks/useRequest';
import { useGlobalState } from '../../../store';
import { currentMeetingState } from '../../../appState';
import { useMeeting } from '../hooks/useMeeting';
import { useSendMessage } from '../hooks/useSendMessage';

export const useEndMeeting = () => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { client } = meeting;

    // To be used to send the chat message
    const {sendMessage} = useSendMessage();

    // Send a request to BE that the meeting was ended
    const [currentMeeting] = useGlobalState(currentMeetingState);
    const { loading, request } = useRequest();
    const sendEndRequest = async () => {
        // return await request(
        //     {
        //         url: 'chats',
        //         api: 'public',
        //         segments: [currentMeeting.id, 'end'],
        //         method: 'put',
        //         body: {
        //             meeting_id: currentMeeting.meetingId,
        //         },
        //     },
        //     undefined,
        //     (data) => {
        //         console.info('Ended the meeting');
        //     }
        // );
    };

    return {
        loading,
        endMeeting: () => {
            // Send a message to all participants that the meeting has ended
            sendMessage(t('chat-left-meeting'), null, 'end', () => {
                // Leave from the zoom meeting
                client.leave();

                // End the meeting request
                sendEndRequest();
            });
        },
    };
}
