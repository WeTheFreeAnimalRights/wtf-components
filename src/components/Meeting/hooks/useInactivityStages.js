import { useCallback, useEffect, useRef, useState } from 'react';
import { useActiveSpeakers } from './useActiveSpeakers';
import { useMeeting } from './useMeeting';

/**
 * useInactivityStages (JS)
 * - phase: "active" -> "warn" -> "actioned"
 * - Warn at `warnAfterMs`, then escalate at `actionAfterMs`.
 * - While phase === "warn", input does NOT reset timers (modal stays visible).
 * - Reset only when you explicitly call `acknowledge()` (e.g., "Still here").
 */
export const useInactivityStages = ({
    warnAfterMs = 15000,
    actionAfterMs = 30000, // must be > warnAfterMs
} = {}) => {
    const meetingContext = useMeeting();
    const client = meetingContext?.meeting?.client;
    const activeSpeakers = useActiveSpeakers(client, 1500, 250);

    const [phase, setPhase] = useState('active'); // "active" | "warn" | "actioned"
    const [secondsIdle, setSecondsIdle] = useState(0);
    const [participantCount, setParticipantCount] = useState(0);
    const [selfUserId, setSelfUserId] = useState(null);
    const [windowInactive, setWindowInactive] = useState(() => {
        if (typeof document === 'undefined') return false;
        return document.visibilityState !== 'visible';
    });

    const lastActiveAt = useRef(Date.now());
    const warnTimer = useRef(null);
    const actionTimer = useRef(null);
    const tickerRef = useRef(null);
    const shouldMonitorRef = useRef(false);

    useEffect(() => {
        if (typeof document === 'undefined') return undefined;

        const handleVisibility = () => {
            setWindowInactive(document.visibilityState !== 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    useEffect(() => {
        if (!client || typeof client.getCurrentUserInfo !== 'function') {
            setSelfUserId(null);
            return;
        }

        try {
            const currentUser = client.getCurrentUserInfo();
            setSelfUserId(currentUser?.userId ?? null);
        } catch {
            setSelfUserId(null);
        }
    }, [client]);

    useEffect(() => {
        if (!client || typeof client.getAllUser !== 'function') {
            setParticipantCount(0);
            return;
        }

        const updateCount = () => {
            try {
                const list = client.getAllUser?.() ?? [];
                setParticipantCount(Array.isArray(list) ? list.length : 0);
            } catch {
                setParticipantCount(0);
            }
        };

        const events = [
            'user-added',
            'user-removed',
            'user-updated',
            'connection-change',
        ];

        events.forEach((event) => client.on?.(event, updateCount));
        updateCount();

        return () => {
            events.forEach((event) => client.off?.(event, updateCount));
        };
    }, [client]);

    const clearTimers = useCallback(() => {
        if (warnTimer.current) window.clearTimeout(warnTimer.current);
        if (actionTimer.current) window.clearTimeout(actionTimer.current);
    }, []);

    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, [clearTimers]);

    const scheduleTimers = useCallback(() => {
        clearTimers();
        if (!shouldMonitorRef.current) {
            return;
        }

        warnTimer.current = window.setTimeout(() => {
            setPhase((p) => (p === 'active' ? 'warn' : p));
        }, warnAfterMs);

        actionTimer.current = window.setTimeout(() => {
            setPhase('actioned');
        }, actionAfterMs);
    }, [clearTimers, warnAfterMs, actionAfterMs]);

    const resetActivity = useCallback(() => {
        lastActiveAt.current = Date.now();
        setSecondsIdle(0);
        scheduleTimers();
    }, [scheduleTimers]);

    const acknowledge = () => {
        // Explicit user confirmation: “Still here”
        setPhase('active');
        if (shouldMonitorRef.current) {
            resetActivity();
        } else {
            lastActiveAt.current = Date.now();
            setSecondsIdle(0);
            clearTimers();
        }
    };

    const hasEnoughParticipants = participantCount >= 2;
    const selfSpeaking =
        hasEnoughParticipants && selfUserId
            ? activeSpeakers.has(selfUserId)
            : false;

    const shouldMonitor =
        windowInactive && (!hasEnoughParticipants || !selfSpeaking);

    useEffect(() => {
        shouldMonitorRef.current = shouldMonitor;
    }, [shouldMonitor]);

    useEffect(() => {
        if (shouldMonitor) {
            setPhase('active');
            resetActivity();
            return;
        }

        clearTimers();
        setPhase('active');
        lastActiveAt.current = Date.now();
        setSecondsIdle(0);
    }, [shouldMonitor, resetActivity, clearTimers]);

    useEffect(() => {
        if (!shouldMonitor) {
            if (tickerRef.current) window.clearTimeout(tickerRef.current);
            return;
        }

        const tick = () => {
            const diff = Math.max(0, Date.now() - lastActiveAt.current);
            setSecondsIdle(Math.floor(diff / 1000));
            tickerRef.current = window.setTimeout(tick, 1000);
        };

        tick();

        return () => {
            if (tickerRef.current) window.clearTimeout(tickerRef.current);
        };
    }, [shouldMonitor]);

    const inactive = phase === 'warn' || phase === 'actioned';
    const escalated = phase === 'actioned';

    return { phase, inactive, escalated, secondsIdle, acknowledge };
};
