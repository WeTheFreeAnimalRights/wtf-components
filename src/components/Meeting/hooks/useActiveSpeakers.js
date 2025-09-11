import { useEffect, useRef, useState } from 'react';

export const useActiveSpeakers = (client, decayMs = 1500, sweepMs = 250) => {
    const [speakers, setSpeakers] = useState(new Set());
    const lastSpokeRef = useRef(new Map()); // userId -> timestamp

    const sweep = () => {
        const now = Date.now();
        const next = new Set();
        lastSpokeRef.current.forEach((ts, userId) => {
            if (now - ts < decayMs) {
                next.add(userId);
            }
        });
        setSpeakers(next);
    };

    useEffect(() => {
        if (!client) {
            return;
        }

        const onActiveSpeaker = (list) => {
            const now = Date.now();
            if (Array.isArray(list)) {
                for (const u of list) {
                    if (u && u.userId) {
                        lastSpokeRef.current.set(u.userId, now);
                    }
                }
            }
        };

        const onUserRemoved = ({ userId }) => {
            if (!userId) {
                return;
            }
            lastSpokeRef.current.delete(userId);
            setSpeakers((prev) => {
                const next = new Set(prev);
                next.delete(userId);
                return next;
            });
        };

        client.on('active-speaker', onActiveSpeaker);
        client.on('user-removed', onUserRemoved);

        const interval = setInterval(sweep, sweepMs);

        return () => {
            client.off('active-speaker', onActiveSpeaker);
            client.off('user-removed', onUserRemoved);
            clearInterval(interval);
        };
    }, [client, decayMs, sweepMs]);

    return speakers; // Set of userIds considered "speaking" right now
};
