import { useEffect, useMemo, useState } from 'react';
import { isUndefined } from 'lodash-es';
import { useMeeting } from '../hooks/useMeeting';

export const ParticipantAudio = ({ id }) => {
    const { meeting } = useMeeting();
    const { client } = meeting;

    const participant = useMemo(() => client.getUser(id), [client, id]);
    const currentUser = useMemo(() => client.getCurrentUserInfo(), [client]);

    const [isMuted, setIsMuted] = useState(() => {
        const p = participant;
        if (p && !isUndefined(p.muted)) {
            return !!p.muted;
        }
        if (p && p.audio && !isUndefined(p.audio.muted)) {
            return !!p.audio.muted;
        }
        return false;
    });

    // Keep local muted state in sync with SDK user model / audio signals
    useEffect(() => {
        const readMuted = () => {
            const p = client.getUser(id);
            if (!p) {
                return;
            }
            if (!isUndefined(p.muted)) {
                setIsMuted(!!p.muted);
                return;
            }
            if (p.audio && !isUndefined(p.audio.muted)) {
                setIsMuted(!!p.audio.muted);
                return;
            }
        };

        readMuted();

        const onUserUpdated = () => {
            readMuted();
        };

        const onAudioActiveChange = (payload) => {
            if (payload && payload.userId === id) {
                const s = payload.state;
                const on = s === 'on' || s === 'Start' || s === true;
                setIsMuted(!on);
            }
        };

        client.on('user-updated', onUserUpdated);
        client.on('audio-active-change', onAudioActiveChange);

        const poll = setInterval(() => {
            const p = client.getUser(id);
            if (!p) {
                return;
            }
            const next = !isUndefined(p.muted)
                ? !!p.muted
                : p.audio && !isUndefined(p.audio.muted)
                  ? !!p.audio.muted
                  : isMuted;
            setIsMuted((prev) => (prev !== next ? next : prev));
        }, 1000);

        return () => {
            client.off('user-updated', onUserUpdated);
            client.off('audio-active-change', onAudioActiveChange);
            clearInterval(poll);
        };
    }, [client, id]);

    // Start/stop LOCAL audio here (moved out of the video component)
    useEffect(() => {
        const run = async () => {
            try {
                const stream = client.getMediaStream();
                const isSelf = currentUser?.userId === participant?.userId;

                if (!isSelf) {
                    return;
                }

                if (meeting.micOn) {
                    try {
                        await stream.startAudio();
                    } catch (err) {
                        console.error('startAudio error:', err);
                    }
                } else {
                    try {
                        await stream.stopAudio();
                    } catch (err) {
                        console.error('stopAudio error:', err);
                    }
                }
            } catch (err) {
                console.error('ParticipantAudio run error:', err);
            }
        };
        run();
    }, [client, participant?.userId, currentUser?.userId, meeting.micOn]);

    // Zoom SDK handles remote audio internally, so nothing to render here.
    return null;
};

ParticipantAudio.displayName = 'ParticipantAudio';
