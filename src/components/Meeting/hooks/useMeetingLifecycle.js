import { isFunction } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useMeeting } from './useMeeting';

/**
 * useMeetingLifecycle
 *
 * Tracks Zoom Video SDK meeting lifecycle and exposes booleans + endReason.
 * Accepts optional callbacks for key moments.
 */
export const useMeetingLifecycle = (opts = {}) => {
    const {
        onJoin,
        onReconnectStart,
        onReconnectEnd,
        onDisconnected,
        onSessionClosed,
        onSelfRemoved,
        onConnectionChange,
    } = opts;

    const { meeting } = useMeeting();
    const { client } = meeting;

    const [inMeeting, setInMeeting] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);
    const [endReason, setEndReason] = useState(null);

    // keep latest callbacks without re-subscribing listeners
    const cbs = useRef(opts);
    useEffect(() => {
        cbs.current = opts;
    }, [opts]);

    const markJoined = () => {
        setInMeeting(true);
        setReconnecting(false);
        setEndReason(null);
        try {
            if (isFunction(cbs.current.onJoin)) {
                cbs.current.onJoin();
            }
        } catch (err) {
            console.error('onJoin callback error:', err);
        }
    };

    useEffect(() => {
        let mounted = true;

        const setIn = (val) => {
            if (!mounted) {
                return;
            }
            setInMeeting(val);
        };

        const onConnChange = (payload = {}) => {
            const { state, reason, errorCode } = payload;

            try {
                if (isFunction(cbs.current.onConnectionChange)) {
                    cbs.current.onConnectionChange(payload);
                }
            } catch (err) {
                console.error('onConnectionChange callback error:', err);
            }

            if (state === 'Reconnecting') {
                setReconnecting(true);
                if (isFunction(cbs.current.onReconnectStart)) {
                    try {
                        cbs.current.onReconnectStart(payload);
                    } catch (err) {
                        console.error('onReconnectStart callback error:', err);
                    }
                }
            } else if (state === 'Reconnected') {
                setReconnecting(false);
                setIn(true);
                if (isFunction(cbs.current.onReconnectEnd)) {
                    try {
                        cbs.current.onReconnectEnd(payload);
                    } catch (err) {
                        console.error('onReconnectEnd callback error:', err);
                    }
                }
            } else if (state === 'Closed' || state === 'Disconnected') {
                setReconnecting(false);
                setEndReason(reason ?? errorCode ?? 'closed');
                setIn(false);
                if (isFunction(cbs.current.onDisconnected)) {
                    try {
                        cbs.current.onDisconnected(payload);
                    } catch (err) {
                        console.error('onDisconnected callback error:', err);
                    }
                }
            }
        };

        const onSessClosed = (payload = {}) => {
            setReconnecting(false);
            setEndReason(payload?.reason ?? 'session-closed');
            setIn(false);
            if (isFunction(cbs.current.onSessionClosed)) {
                try {
                    cbs.current.onSessionClosed(payload);
                } catch (err) {
                    console.error('onSessionClosed callback error:', err);
                }
            }
        };

        const onUserRemoved = (users = []) => {
            const me = client.getCurrentUserInfo?.();
            if (!me) {
                return;
            }
            const removedSelf =
                Array.isArray(users) &&
                users.some((u) => u?.userId === me.userId);
            if (removedSelf) {
                setReconnecting(false);
                setEndReason('removed');
                setIn(false);
                if (isFunction(cbs.current.onSelfRemoved)) {
                    try {
                        cbs.current.onSelfRemoved(users);
                    } catch (err) {
                        console.error('onSelfRemoved callback error:', err);
                    }
                }
            }
        };

        client.on('connection-change', onConnChange);
        client.on('session-closed', onSessClosed);
        client.on('user-removed', onUserRemoved);

        return () => {
            mounted = false;
            try {
                client.off('connection-change', onConnChange);
                client.off('session-closed', onSessClosed);
                client.off('user-removed', onUserRemoved);
            } catch (e) {
                console.error('unsubscribe error:', e);
            }
        };
    }, [client]);

    const leaveMeeting = async () => {
        try {
            await client.leave();
        } catch (err) {
            console.error('leave() error:', err);
        } finally {
            setInMeeting(false);
        }
    };

    return { inMeeting, reconnecting, endReason, markJoined, leaveMeeting };
};
