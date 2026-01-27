import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslations } from '../../../hooks/useTranslations';
import { buildSocketConfig } from '../../../hooks/useSocket';
import { useChatSocket } from '../hooks/useChatSocket';
import { MediaAccessModal } from './MediaAccessModal';
import { PreloaderStates } from '../../Preloader/PreloaderStates';
import { getStatusFromMeeting } from '../helpers/getStatusFromMeeting';
import { useCountdown } from '../../../hooks/useCountdown';
import { Progress } from '../../../_shadcn/components/progress';
import { Button } from '../../Button';

const NO_ACTIVISTS_COUNTDOWN_SECONDS = 30;

export const MeetingLoader = ({
    item,
    children,
    className,
    cancelUrl,
    resourcesUrl,
    socketConfig,
}) => {
    const { t } = useTranslations();

    const [status, setStatus] = useState(getStatusFromMeeting(item));
    const [activist, setActivist] = useState(item.activist || {});
    const [mediaPermissionsChecked, setMediaPermissionsChecked] =
        useState(false);
    const [noActivistsCountdownDone, setNoActivistsCountdownDone] =
        useState(false);
    const [, navigate] = useLocation();

    const builtConfig = useMemo(
        () => buildSocketConfig(socketConfig),
        [socketConfig]
    );

    const { listen, leave } = useChatSocket({
        meeting: item,
        configOverrides: builtConfig,
        callback: (payload) => {
            setStatus(payload.type);
            setActivist(payload.activist);
        },
    });

    useEffect(() => {
        listen();

        return () => {
            leave();
        };
    }, [listen, leave]);

    const {
        percent: noActivistsCountdownPercent,
        start: startNoActivistsCountdown,
        end: endNoActivistsCountdown,
    } = useCountdown(NO_ACTIVISTS_COUNTDOWN_SECONDS, () => {
        setNoActivistsCountdownDone(true);
    });

    useEffect(() => {
        if (status !== 'no_activists_available') {
            endNoActivistsCountdown();
            setNoActivistsCountdownDone(false);
            return;
        }

        setNoActivistsCountdownDone(false);
        startNoActivistsCountdown();
    }, [endNoActivistsCountdown, startNoActivistsCountdown, status]);

    const tooltipMessage = t(`tooltip-continue-${status}`, [
        activist?.name,
        status,
    ]);

    return (
        <>
            <MediaAccessModal
                open={status !== 'loading' && !mediaPermissionsChecked}
                onClose={() => {
                    setMediaPermissionsChecked(true);
                }}
                onCancel={
                    cancelUrl
                        ? () => {
                              navigate(cancelUrl);
                          }
                        : undefined
                }
                continueDisabled={status !== 'entered'}
                continueTooltip={tooltipMessage}
            >
                <div className="text-sm text-center">
                    <div>{t(`meeting-status-${status}`, [activist?.name])}</div>
                    {status === 'no_activists_available' && (
                        <div className="mt-3 flex flex-col items-center gap-3">
                            {!noActivistsCountdownDone && resourcesUrl && (
                                <Progress
                                    value={noActivistsCountdownPercent}
                                    className="w-56 max-w-full h-1.5"
                                />
                            )}
                            {noActivistsCountdownDone && resourcesUrl && (
                                <Button
                                    variant="simple"
                                    onClick={() => {
                                        navigate(resourcesUrl);
                                    }}
                                >
                                    {t('view-resources')}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </MediaAccessModal>
            <PreloaderStates
                loading={status === 'loading' || !mediaPermissionsChecked}
                loadingMessage={t('waiting-for-activist')}
                className={className}
            >
                {children}
            </PreloaderStates>
        </>
    );
};

MeetingLoader.displayName = 'MeetingLoader';
