import { LogOut } from 'lucide-react';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { Spinner } from '../../Spinner';
import { useTranslations } from '../../../hooks/useTranslations';
import { useConfirm } from '../../Confirm';
import { useEndMeeting } from '../hooks/useEndMeeting';

export const EndButton = () => {
    const { t } = useTranslations();

    // Confirm before ending
    const { confirm } = useConfirm();

    // End the meeting
    const { loading, endMeeting } = useEndMeeting();

    return (
        <>
            {loading && (
                <div className="fixed left-0 right-0 top-0 bottom-0 rounded-lg bg-background/75 z-[100] flex flex-col items-center justify-center">
                    <Spinner />
                </div>
            )}
            <Tooltip message={t('chat-end-tooltip')}>
                <Button
                    variant="gray"
                    onClick={() => {
                        confirm({
                            title: t('end-meeting-confirm-title'),
                            message: t('end-meeting-confirm-message'),
                            callback: () => {
                                endMeeting();
                            },
                        });
                    }}
                >
                    <LogOut className="w-4 h-4" />
                </Button>
            </Tooltip>
        </>
    );
};

EndButton.displayName = 'EndButton';
