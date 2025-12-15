import { useEffect, useMemo } from 'react';
import { useEcho } from '@laravel/echo-react';
import { configureSocket } from './configureSocket';

const visibilityMap = {
    presence: 'presence',
    private: 'private',
    public: 'public',
};

export const useSocket = ({
    channel,
    event,
    callback,
    channelType = 'presence',
    autoListen = true,
    configOverrides,
}) => {
    // Ensure Echo is configured before subscribing
    configureSocket(configOverrides);

    const visibility = visibilityMap[channelType] || 'presence';
    const events = useMemo(() => event, [event]);

    const { listen, stopListening, leave, leaveChannel, channel: getChannel } = useEcho(
        channel,
        events,
        callback,
        [callback],
        visibility
    );

    useEffect(() => {
        if (!autoListen) {
            stopListening();
        }
    }, [autoListen, stopListening]);

    return {
        listen,
        stopListening,
        leave,
        leaveChannel,
        channel: getChannel,
    };
};
