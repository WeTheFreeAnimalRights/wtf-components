import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isFunction } from 'lodash-es';

/**
 * Counts down from a duration (in seconds) and invokes a callback once when finished.
 *
 * @param {number} durationSeconds - Countdown length in seconds.
 * @param {Function} onComplete - Callback executed when the timer reaches zero.
 * @returns {{value: number, percent: number, start: Function, end: Function}} Remaining seconds, completion percent, and start/end functions.
 */
export const useCountdown = (durationSeconds = 0, onComplete) => {
    const durationMs = useMemo(
        () => Math.max(0, Number(durationSeconds) || 0) * 1000,
        [durationSeconds]
    );

    const [remainingMs, setRemainingMs] = useState(durationMs);
    const [runId, setRunId] = useState(0);
    const callbackRef = useRef(onComplete);
    const startCallbackRef = useRef();
    const finishedRef = useRef(false);
    const intervalRef = useRef();

    const start = useCallback((startComplete) => {
        startCallbackRef.current = startComplete;
        setRunId((current) => current + 1);
    }, []);

    const end = useCallback(() => {
        finishedRef.current = true;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
        }
        startCallbackRef.current = undefined;
    }, []);

    useEffect(() => {
        callbackRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (runId === 0) {
            setRemainingMs(durationMs);
            return undefined;
        }

        finishedRef.current = false;
        setRemainingMs(durationMs);

        // If duration is zero, run callback immediately and skip the interval.
        if (durationMs === 0) {
            finishedRef.current = true;
            if (isFunction(startCallbackRef.current)) {
                startCallbackRef.current();
            }
            if (isFunction(callbackRef.current)) {
                callbackRef.current();
            }
            return undefined;
        }

        const endTime = Date.now() + durationMs;
        const tick = () => {
            const remaining = Math.max(0, endTime - Date.now());
            setRemainingMs(remaining);

            if (remaining === 0) {
                if (!finishedRef.current) {
                    finishedRef.current = true;
                    if (isFunction(startCallbackRef.current)) {
                        startCallbackRef.current();
                    }
                    if (isFunction(callbackRef.current)) {
                        callbackRef.current();
                    }
                }

                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = undefined;
                }
            }
        };

        tick();
        intervalRef.current = setInterval(tick, 250);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        };
    }, [durationMs, runId]);

    const value = Math.ceil(remainingMs / 1000);
    const percent =
        durationMs === 0
            ? 100
            : Math.min(100, ((durationMs - remainingMs) / durationMs) * 100);

    return { value, percent, start, end };
};
