import { useEffect, useMemo, useState } from 'react';
import { parseDate } from '../../DatePicker/parseDate';

/**
 * Tracks elapsed and remaining time until a meeting is auto-ended.
 *
 * @param {Object} params
 * @param {number|Date|string} params.startedAt - Meeting start timestamp or date-like value.
 * @param {number} params.warnAfterMs - Delay before warning phase begins.
 * @param {number} params.autoCloseDelayMs - Delay after warn before auto-ending.
 */
export const useMeetingAutoEndTimer = ({
    startedAt,
    warnAfterMs = 20 * 60 * 1000,
    autoCloseDelayMs = 5 * 60 * 1000,
} = {}) => {
    const startTimestamp = useMemo(() => {
        if (!startedAt) {
            return Date.now();
        }

        if (typeof startedAt === 'number') {
            return startedAt;
        }

        const parsed = parseDate(startedAt, true).getTime();
        return Number.isFinite(parsed) ? parsed : Date.now();
    }, [startedAt]);

    const warnDuration = Math.max(0, warnAfterMs);
    const autoCloseDuration = Math.max(0, autoCloseDelayMs);

    const autoEndTimestamp = useMemo(
        () => startTimestamp + warnDuration + autoCloseDuration,
        [autoCloseDuration, startTimestamp, warnDuration]
    );

    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const timePassedMs = Math.max(0, now - startTimestamp);
    const timeLeftMs = Math.max(0, autoEndTimestamp - now);
    const hasWarned = timePassedMs >= warnDuration;

    return {
        now,
        startTimestamp,
        autoEndTimestamp,
        warnDuration,
        autoCloseDuration,
        timePassedMs,
        timeLeftMs,
        hasWarned,
    };
};
