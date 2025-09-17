import { useEffect, useMemo, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { ToggleButton } from './ToggleButton';
import { useMeeting } from '../hooks/useMeeting';
import { isFunction, isUndefined } from 'lodash-es';

export const MicToggleButton = () => {
    const { meeting } = useMeeting();
    const { client } = meeting;

    const stream = useMemo(() => client.getMediaStream(), [client]);
    const currentUser = useMemo(() => client.getCurrentUserInfo(), [client]);

    const readSelfMuted = () => {
        try {
            const me = currentUser?.userId ? client.getUser(currentUser.userId) : null;
            if (!me) {
                return false;
            }
            if (!isUndefined(me.muted)) {
                return !!me.muted;
            }
            if (me.audio && !isUndefined(me.audio.muted)) {
                return !!me.audio.muted;
            }
            return false;
        } catch (err) {
            console.error('readSelfMuted error:', err);
            return false;
        }
    };

    const [microphoneMuted, setMicrophoneMuted] = useState(() => readSelfMuted());
    const [busy, setBusy] = useState(false); // prevent double taps

    // Keep local state in sync with SDK
    useEffect(() => {
        const update = () => {
            setMicrophoneMuted(readSelfMuted());
        };

        update();

        const onUserUpdated = () => {
            update();
        };

        // Some builds emit audio activity; treat "active" as unmuted
        const onAudioActiveChange = ({ userId, state }) => {
            if (!currentUser?.userId || userId !== currentUser.userId) {
                return;
            }
            const s = typeof state === 'string' ? state.toLowerCase() : state;
            const active = s === true || s === 'on' || s === 'start' || s === 'active';
            setMicrophoneMuted(!active);
        };

        client.on('user-updated', onUserUpdated);
        client.on('audio-active-change', onAudioActiveChange);

        return () => {
            try {
                client.off('user-updated', onUserUpdated);
                client.off('audio-active-change', onAudioActiveChange);
            } catch (e) {
                console.error('MicToggleButton unsubscribe error:', e);
            }
        };
    }, [client, currentUser?.userId]);

    const toggleMic = async () => {
        if (busy) {
            return;
        }
        setBusy(true);
        try {
            // Unmute (turn mic on)
            if (microphoneMuted) {
                try {
                    // Ensure audio subsystem is started (user gesture: this click)
                    await stream.startAudio();
                } catch (err) {
                    console.error('startAudio error:', err);
                }
                if (isFunction(stream.unmuteAudio)) {
                    try {
                        await stream.unmuteAudio();
                    } catch (err) {
                        console.error('unmuteAudio error:', err);
                    }
                }
            } else {
                // Mute (turn mic off)
                if (isFunction(stream.muteAudio)) {
                    try {
                        await stream.muteAudio();
                    } catch (err) {
                        console.error('muteAudio error:', err);
                    }
                } else {
                    try {
                        await stream.stopAudio();
                    } catch (err) {
                        console.error('stopAudio error:', err);
                    }
                }
            }
        } finally {
            // Re-read from SDK to avoid drift
            setMicrophoneMuted(readSelfMuted());
            setBusy(false);
        }
    };

    return (
        <ToggleButton
            components={{ on: Mic, off: MicOff }}
            value={!microphoneMuted} // true = mic is on
            disabled={busy}
            onChange={toggleMic}
        />
    );
};

MicToggleButton.displayName = 'MicToggleButton';
