import { useCallback } from 'react';
import { sha256 } from 'js-sha256';
import { forcePusherXHR } from '../../../helpers/forcePusherXHR';
import { useSocket } from '../../../hooks/useSocket';

// Force pusher to use credentials
forcePusherXHR();

export const useChatSocket = ({
    meeting,
    configOverrides,
    callback: callbackFn,
}) => {
    const callback = useCallback(callbackFn, []);

    return useSocket({
        channel: `chats.${meeting.id}.${sha256(meeting.roomId)}`,
        channelType: 'presence',
        event: [
            'ActivistEnteredMeeting',
            'ActivistAcceptedOffer',
            'ActivistDeclinedOffer',
        ],
        callback,
        configOverrides,
    });
};
