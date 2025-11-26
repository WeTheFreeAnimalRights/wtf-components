import React from 'react';
import { cn } from '_/lib/utils';
import { Hourglass } from 'lucide-react';
import { Tooltip } from '../../Tooltip';
import { useTranslations } from '../../../hooks/useTranslations';
import { DurationGuardModal } from './DurationGuardModal';
import { useMeetingAutoEndTimer } from '../hooks/useMeetingAutoEndTimer';
import { formatMsToClock } from '../helpers/formatMsToClock';

export const MeetingDuration = ({
    startedAt,
    warnAfterMs = 20 * 60 * 1000,
    autoCloseDelayMs = 5 * 60 * 1000,
    className,
    showIcon = true,
    showGuard = true,
    autoEndOnExpire = true,
}) => {
    const { t } = useTranslations();
    const { timePassedMs, timeLeftMs, hasWarned } = useMeetingAutoEndTimer({
        startedAt,
        warnAfterMs,
        autoCloseDelayMs,
    });

    const elapsedLabel = formatMsToClock(timePassedMs);
    const remainingLabel = formatMsToClock(timeLeftMs);

    const display = (
        <span
            className={cn(
                'text-muted-foreground flex flex-row items-center',
                className,
                hasWarned && 'cursor-help animate-pulse'
            )}
        >
            {showIcon && (
                <Hourglass
                    className={cn('w-4 h-4 me-1', hasWarned && 'text-red-500')}
                />
            )}
            {hasWarned ? (
                <span className="font-semibold text-red-500">
                    {remainingLabel}
                </span>
            ) : (
                elapsedLabel
            )}
        </span>
    );

    return (
        <>
            {hasWarned ? (
                <Tooltip
                    message={t('meeting-duration-tooltip', [remainingLabel])}
                >
                    {display}
                </Tooltip>
            ) : (
                display
            )}
            {showGuard && (
                <DurationGuardModal
                    startedAt={startedAt}
                    warnAfterMs={warnAfterMs}
                    autoCloseDelayMs={autoCloseDelayMs}
                    autoEndOnExpire={autoEndOnExpire}
                />
            )}
        </>
    );
};

MeetingDuration.displayName = 'MeetingDuration';
