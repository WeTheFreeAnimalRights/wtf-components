import { useEffect, useMemo } from 'react';
import { useEcho } from '@laravel/echo-react';
import { configureSocket } from './configureSocket';
import { camelizeObject } from '../../helpers/camelizeObject';

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

    const wrappedCallback = useMemo(() => {
        if (!callback) {
            return callback;
        }

        return (...args) => callback(...args.map((arg) => camelizeObject(arg)));
    }, [callback]);

    const {
        listen,
        stopListening,
        leave,
        leaveChannel,
        channel: getChannel,
    } = useEcho(
        channel,
        events,
        wrappedCallback,
        [wrappedCallback],
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
