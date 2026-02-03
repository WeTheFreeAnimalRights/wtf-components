import { useCallback, useMemo, useRef } from 'react';
import { configureSocket, getPusherClient } from './configureSocket';
import { camelizeObject } from '../../helpers/camelizeObject';

const visibilityMap = {
    presence: 'presence',
    private: 'private',
    public: 'public',
};

const getChannelName = (channel, visibility) => {
    if (visibility === 'private') {
        return `private-${channel}`;
    }

    if (visibility === 'presence') {
        return `presence-${channel}`;
    }

    return channel;
};

export const useSocket = ({
    channel,
    event,
    callback,
    channelType = 'presence',
    configOverrides,
}) => {
    const visibility = visibilityMap[channelType] || 'presence';
    const events = useMemo(() => {
        if (!event) {
            return [];
        }

        return Array.isArray(event) ? event : [event];
    }, [event]);
    const channelName = useMemo(
        () => getChannelName(channel, visibility),
        [channel, visibility]
    );
    const channelRef = useRef(null);

    const wrappedCallback = useMemo(() => {
        if (!callback) {
            return callback;
        }

        return (...args) => callback(...args.map((arg) => camelizeObject(arg)));
    }, [callback]);

    const ensureChannel = useCallback(() => {
        const client = getPusherClient() || configureSocket(configOverrides);
        if (!client) {
            return null;
        }

        if (!channelRef.current) {
            channelRef.current = client.subscribe(channelName);
        }

        return channelRef.current;
    }, [channelName, configOverrides]);

    const bindEvents = useCallback(
        (channelInstance) => {
            if (!channelInstance || !wrappedCallback) {
                return;
            }

            events.forEach((eventName) => {
                channelInstance.bind(eventName, wrappedCallback);
            });
        },
        [events, wrappedCallback]
    );

    const unbindEvents = useCallback(
        (channelInstance) => {
            if (!channelInstance || !wrappedCallback) {
                return;
            }

            events.forEach((eventName) => {
                channelInstance.unbind(eventName, wrappedCallback);
            });
        },
        [events, wrappedCallback]
    );

    const listen = useCallback(() => {
        const channelInstance = ensureChannel();
        bindEvents(channelInstance);
    }, [bindEvents, ensureChannel]);

    const stopListening = useCallback(() => {
        unbindEvents(channelRef.current);
    }, [unbindEvents]);

    const leave = useCallback(() => {
        const client = getPusherClient();
        if (!client || !channelRef.current) {
            return;
        }

        unbindEvents(channelRef.current);
        client.unsubscribe(channelName);
        channelRef.current = null;
    }, [channelName, unbindEvents]);

    return {
        listen,
        stopListening,
        leave,
        leaveChannel: leave,
        channel: () => channelRef.current,
    };
};
