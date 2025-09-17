import { LogOut } from 'lucide-react';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { useTranslations } from '../../../hooks/useTranslations';
import { useMeeting } from '../hooks/useMeeting';

export const EndButton = () => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { client } = meeting;

    return (
        <Tooltip message={t('chat-end-tooltip')}>
            <Button variant="gray" onClick={() => client.leave(client.isHost())}>
                <LogOut className="w-4 h-4" />
            </Button>
        </Tooltip>
    );
};

EndButton.displayName = 'EndButton';
