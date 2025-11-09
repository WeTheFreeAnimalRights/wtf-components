import { isFunction, trim } from 'lodash-es';
import { formatInTimeZone } from 'date-fns-tz'
import { useRequest } from '../../../hooks/useRequest';
import { useGlobalState } from '../../../store';
import { currentMeetingState } from '../../../appState';
import { useMeeting } from './useMeeting';

export const useSendMessage = ({isActivist = false} = {}) => {
    const { meeting } = useMeeting();
    const { client } = meeting;
    const chat = client.getChatClient();

    // Send a request to BE that the meeting was ended
    const [currentMeeting] = useGlobalState(currentMeetingState);
    const { loading, request } = useRequest();
    const currentUser = client.getCurrentUserInfo();
    const sendRequest = async ({message, date, resource, type}) => {
        return await request(
            {
                url: 'chats',
                api: 'public',
                segments: [currentMeeting.id, 'messages'],
                method: 'post',
                body: {
                    meeting_id: currentMeeting.meetingId,
                    sent_at: formatInTimeZone(date, 'UTC', 'yyyy-MM-dd HH:mm:ss'),
                    message: type === 'message' ? message : null,
                    resource_id: type === 'resource' ? resource?.id : null,
                    user_id: isActivist ? currentMeeting?.activist?.id : null,
                    meta_data: JSON.stringify({
                        displayName: currentUser?.displayName,
                        userId: currentUser?.userId,
                    }),
                },
            },
            undefined,
            () => {
                console.info('Sent the message');
            }
        );
    };

    return {
        loading,
        sendMessage: async (_message, resource = null, type = 'message', callback) => {
            const message = trim(_message);

            // Send to zoom and backend
            const payload = {
                type,
                message,
                resource,
            };
            try {
                await chat.sendToAll(JSON.stringify(payload));

                // Not the end message
                if (type !== 'end') {
                    await sendRequest({
                        message,
                        resource,
                        date: new Date(),
                        type,
                    });
                }
            } catch (err) {
                console.error('chat.sendToAll error:', err);
            }
            if (isFunction(callback)) {
                callback();
            }
        },
    };
};
