import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslations } from '../../../hooks/useTranslations';
import { buildSocketConfig } from '../../../hooks/useSocket';
import { useCountdown } from '../../../hooks/useCountdown';
import { useChatSocket } from '../hooks/useChatSocket';
import { useEndMeeting } from '../hooks/useEndMeeting';
import { useConfirm } from '../../Confirm';
import { MediaAccessModal } from './MediaAccessModal';
import { PreloaderStates } from '../../Preloader/PreloaderStates';
import { getStatusFromMeeting } from '../helpers/getStatusFromMeeting';

const NO_ACTIVIST_TIMEOUT_SECONDS = 60 * 5; // 5 minutes

export const MeetingLoader = ({
    item,
    children,
    className,
    cancelUrl,
    socketConfig,
    onStatusChange,
}) => {
    const { t } = useTranslations();
    const { confirm } = useConfirm();
    const { endMeeting } = useEndMeeting();

    const [status, setStatus] = useState(getStatusFromMeeting(item));
    const [activist, setActivist] = useState(item.activist || {});
    const [mediaPermissionsChecked, setMediaPermissionsChecked] =
        useState(false);
    const [, navigate] = useLocation();

    const builtConfig = useMemo(
        () => buildSocketConfig(socketConfig),
        [socketConfig]
    );
    const shouldRunNoActivistCountdown =
        mediaPermissionsChecked && status !== 'entered';

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
        start: startNoActivistCountdown,
        end: endNoActivistCountdown,
    } = useCountdown(NO_ACTIVIST_TIMEOUT_SECONDS, () => {
        if (!shouldRunNoActivistCountdown) {
            return;
        }

        confirm({
            title: t('end-meeting-confirm-title'),
            message: t('end-meeting-confirm-message'),
            hideCancel: true,
            callback: () => {
                endMeeting();
            },
        });
    });

    useEffect(() => {
        if (!shouldRunNoActivistCountdown) {
            endNoActivistCountdown();
            return;
        }

        startNoActivistCountdown();
    }, [
        endNoActivistCountdown,
        shouldRunNoActivistCountdown,
        startNoActivistCountdown,
    ]);

    useEffect(() => {
        if (!onStatusChange) {
            return;
        }

        onStatusChange(status, {
            activist,
            item,
        });
    }, [activist, item, onStatusChange, status]);

    return (
        <>
            <MediaAccessModal
                open={!mediaPermissionsChecked}
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
            >
                <div className="text-sm text-center">
                    <div>{t(`meeting-status-${status}`, [activist?.name])}</div>
                </div>
            </MediaAccessModal>
            <PreloaderStates
                loading={!mediaPermissionsChecked}
                loadingMessage={t('waiting-for-activist')}
                className={className}
            >
                {children}
            </PreloaderStates>
        </>
    );
};

MeetingLoader.displayName = 'MeetingLoader';
