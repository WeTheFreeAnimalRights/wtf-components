import { useCallback } from 'react';
import { sha256 } from 'js-sha256';
import { useSocket } from '../../../hooks/useSocket';

export const useChatSocket = ({
    meeting,
    configOverrides,
    callback: callbackFn,
}) => {
    const callback = useCallback(callbackFn, []);

    return useSocket({
        channel: `chats.${meeting.id}.${sha256(meeting.roomId)}`,
        channelType: 'public',
        event: [
            'ActivistEnteredMeeting',
            'ActivistAcceptedOffer',
            'ActivistDeclinedOffer',
            'NoActivistsAvailable',
        ],
        callback,
        configOverrides,
    });
};
