import { useCallback } from 'react';
import { forcePusherXHR } from '../../../helpers/forcePusherXHR';
import { useTranslations } from '../../../hooks/useTranslations';
import { useSocket } from '../../../hooks/useSocket';

// Force pusher to use credentials
forcePusherXHR();

export const useChatSocket = ({ meeting, configOverrides }) => {
    const { t } = useTranslations();

    const callback = useCallback(
        () => {
            console.log('nothing');
        },
        [t]
    );

    return useSocket({
        channel: `chats.${meeting.id}.${meeting.roomId}`,
        event: 'ChatAvailable',
        callback,
        configOverrides,
    });
};
