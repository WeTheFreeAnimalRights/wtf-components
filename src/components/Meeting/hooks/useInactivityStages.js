import { useEffect, useRef, useState } from "react";

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
  const [phase, setPhase] = useState("active"); // "active" | "warn" | "actioned"
  const [secondsIdle, setSecondsIdle] = useState(0);

  const lastActiveAt = useRef(Date.now());
  const warnTimer = useRef(null);
  const actionTimer = useRef(null);
  const tickerRef = useRef(null);

  const clearTimers = () => {
    if (warnTimer.current) window.clearTimeout(warnTimer.current);
    if (actionTimer.current) window.clearTimeout(actionTimer.current);
  };

  const scheduleTimers = () => {
    clearTimers();
    // Schedule both timers from "last activity"
    warnTimer.current = window.setTimeout(() => {
      setPhase((p) => (p === "active" ? "warn" : p));
    }, warnAfterMs);

    actionTimer.current = window.setTimeout(() => {
      setPhase("actioned");
    }, actionAfterMs);
  };

  const acknowledge = () => {
    // Explicit user confirmation: “Still here”
    lastActiveAt.current = Date.now();
    setPhase("active");
    setSecondsIdle(0);
    scheduleTimers();
  };

  useEffect(() => {
    const onActivity = () => {
      // Ignore activity while warning/actioned to keep the modal up
      if (phase !== "active") return;
      lastActiveAt.current = Date.now();
      // Re-arm timers from now
      scheduleTimers();
    };

    const events = [
      "mousemove", "mousedown", "mouseup", "keydown", "keyup",
      "scroll", "wheel", "click", "touchstart", "touchmove", "touchend",
      "pointerdown", "pointermove"
    ];
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    // Idle seconds ticker
    const tick = () => {
      const diff = Math.max(0, Date.now() - lastActiveAt.current);
      setSecondsIdle(Math.floor(diff / 1000));
      tickerRef.current = window.setTimeout(tick, 1000);
    };

    // Coming back to visible shouldn’t auto-dismiss if we’re already warning
    const onVisibility = () => {
      if (document.visibilityState === "visible" && phase === "active") {
        lastActiveAt.current = Date.now();
        scheduleTimers();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // start
    scheduleTimers();
    tick();

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimers();
      if (tickerRef.current) window.clearTimeout(tickerRef.current);
    };
  }, [warnAfterMs, actionAfterMs, phase]);

  const inactive = phase === "warn" || phase === "actioned";
  const escalated = phase === "actioned";

  return { phase, inactive, escalated, secondsIdle, acknowledge };
}
