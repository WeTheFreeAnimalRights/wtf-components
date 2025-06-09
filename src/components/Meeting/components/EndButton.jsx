import { LogOut } from 'lucide-react';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEndMeeting } from '../hooks/useEndMeeting';

export const EndButton = () => {
    const { t } = useTranslations();
    const endMeeting = useEndMeeting();

    return (
        <Tooltip message={t('chat-end-tooltip')}>
            <Button variant="gray" onClick={() => endMeeting()}>
                <LogOut className="w-4 h-4" />
            </Button>
        </Tooltip>
    );
};
