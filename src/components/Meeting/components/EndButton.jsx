import { LogOut } from 'lucide-react';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { useTranslations } from '../../../hooks/useTranslations';
import { useConfirm } from '../../Confirm';
import { useMeeting } from '../hooks/useMeeting';

export const EndButton = () => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { confirm } = useConfirm();
    const { client } = meeting;

    return (
        <Tooltip message={t('chat-end-tooltip')}>
            <Button
                variant="gray"
                onClick={() => {
                    confirm({
                        title: t('end-meeting-confirm-title'),
                        message: t('end-meeting-confirm-message'),
                        callback: () => {
                            client.leave();
                        },
                    });
                }}
            >
                <LogOut className="w-4 h-4" />
            </Button>
        </Tooltip>
    );
};

EndButton.displayName = 'EndButton';
