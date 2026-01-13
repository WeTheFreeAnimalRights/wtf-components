import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslations } from '../../../hooks/useTranslations';
import { buildSocketConfig } from '../../../hooks/useSocket';
import { useChatSocket } from '../hooks/useChatSocket';
import { MediaAccessModal } from './MediaAccessModal';
import { PreloaderStates } from '../../Preloader/PreloaderStates';
import { Translation } from '../../Translation';

export const MeetingLoader = ({
    item,
    children,
    className,
    cancelUrl,
    socketConfig,
}) => {
    const { t } = useTranslations();

    const [status, setStatus] = useState('loading');
    const [activist, setActivist] = useState({});
    const [mediaPermissionsChecked, setMediaPermissionsChecked] =
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

    const tooltipMessage = t(`tooltip-continue-${status}`, [activist?.name, status]);

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
            ><div className="text-sm text-center"><Translation
                    expression={
                        '{name} status {status}'
                    }
                    vars={{
                        name: <strong className="font-semibold">{activist?.name}</strong>,
                        status: <strong className='font-semibold'>{status}</strong>
                    }}
                /></div></MediaAccessModal>
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
