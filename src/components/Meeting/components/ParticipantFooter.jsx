import { MicOff } from 'lucide-react';
import { Badge } from '../../Badge';
import { useTranslations } from '../../../hooks/useTranslations';
import { useRealParticipant } from '../hooks/useRealParticipant';
import { cn } from '_/lib/utils';

export const ParticipantFooter = ({ id, className }) => {
    const { t } = useTranslations();
    const { micOn, participant, isActiveSpeaker, webcamOn } =
        useRealParticipant(id);

    return (
        <div className={cn('p-3 flex flex-row items-end', className)}>
            <div className="flex-grow">
                {webcamOn && (
                    <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                        {participant.displayName}
                    </div>
                )}
            </div>

            {isActiveSpeaker && <Badge>{t('speaking')}</Badge>}
            {!micOn && (
                <div className="p-4 rounded-full bg-background/80 ms-2">
                    <MicOff className="w-4 h-4" />
                </div>
            )}
        </div>
    );
};
