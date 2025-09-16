import { useEffect, useMemo, useState } from 'react';
import { Video, VideoOff } from 'lucide-react';
import { ToggleButton } from './ToggleButton';
import { useMeeting } from '../hooks/useMeeting';
import { isFunction, isUndefined } from 'lodash-es';

export const CamToggleButton = () => {
    const { meeting } = useMeeting();
    const { client } = meeting;

    const stream = useMemo(() => client.getMediaStream(), [client]);
    const currentUser = useMemo(() => client.getCurrentUserInfo(), [client]);

    const readSelfVideoOn = () => {
        try {
            const me = currentUser?.userId ? client.getUser(currentUser.userId) : null;
            if (!me) {
                return false;
            }
            if (!isUndefined(me.bVideoOn)) {
                return !!me.bVideoOn;
            }
            // Some SDK builds may store video state under media sub-objects; fallback false.
            return false;
        } catch (err) {
            console.error('readSelfVideoOn error:', err);
            return false;
        }
    };

    const [cameraOn, setCameraOn] = useState(() => readSelfVideoOn());
    const [busy, setBusy] = useState(false);

    // Keep local camera state in sync with SDK
    useEffect(() => {
        const update = () => {
            setCameraOn(readSelfVideoOn());
        };

        update();

        const onUserUpdated = () => {
            update();
        };

        const onVideoActiveChange = ({ userId, state }) => {
            if (!currentUser?.userId || userId !== currentUser.userId) {
                return;
            }
            const s = typeof state === 'string' ? state.toLowerCase() : state;
            const on = s === true || s === 'on' || s === 'start' || s === 'active';
            setCameraOn(on);
        };

        client.on('user-updated', onUserUpdated);
        client.on('video-active-change', onVideoActiveChange);

        return () => {
            try {
                client.off('user-updated', onUserUpdated);
                client.off('video-active-change', onVideoActiveChange);
            } catch (e) {
                console.error('CamToggleButton unsubscribe error:', e);
            }
        };
    }, [client, currentUser?.userId]);

    const toggleCam = async () => {
        if (busy) {
            return;
        }
        setBusy(true);
        try {
            if (cameraOn) {
                // Turn camera off
                try {
                    if (isFunction(stream.stopVideo)) {
                        await stream.stopVideo();
                    } else {
                        console.warn('stopVideo not available on mediaStream');
                    }
                } catch (err) {
                    console.error('stopVideo error:', err);
                }
            } else {
                // Turn camera on
                try {
                    if (isFunction(stream.startVideo)) {
                        await stream.startVideo();
                    } else {
                        console.warn('startVideo not available on mediaStream');
                    }
                } catch (err) {
                    console.error('startVideo error:', err);
                }
            }
        } finally {
            // Re-read from SDK in case of lag
            setCameraOn(readSelfVideoOn());
            setBusy(false);
        }
    };

    return (
        <ToggleButton
            components={{ on: Video, off: VideoOff }}
            value={cameraOn}      // true = camera is on
            disabled={busy}
            onChange={toggleCam}
        />
    );
};
