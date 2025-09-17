import { useEffect, useMemo, useState } from 'react';
import { MicOff } from 'lucide-react';
import { isString, isUndefined } from 'lodash-es';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '_/lib/utils';
import { useMeeting } from '../hooks/useMeeting';

export const ParticipantFooter = ({ id, className }) => {
    const { t } = useTranslations();
    const { meeting } = useMeeting();
    const { client } = meeting;

    const participant = useMemo(() => client.getUser(id), [client, id]);

    const [webcamOn, setWebcamOn] = useState(
        () => participant?.bVideoOn ?? false
    );
    const [micOn, setMicOn] = useState(() => {
        if (participant && !isUndefined(participant.muted)) {
            return !participant.muted;
        }
        if (
            participant &&
            participant.audio &&
            !isUndefined(participant.audio.muted)
        ) {
            return !participant.audio.muted;
        }
        return true;
    });

    useEffect(() => {
        const updateFromUser = () => {
            const p = client.getUser(id);
            if (!p) {
                return;
            }
            if (!isUndefined(p.bVideoOn)) {
                setWebcamOn(!!p.bVideoOn);
            }
            if (!isUndefined(p.muted)) {
                setMicOn(!p.muted);
            } else if (p.audio && !isUndefined(p.audio.muted)) {
                setMicOn(!p.audio.muted);
            }
        };

        updateFromUser();

        const onUserUpdated = () => {
            updateFromUser();
        };

        // Keep webcam flag in sync with camera state changes
        const onVideoActiveChange = ({ userId, state }) => {
            if (userId !== id) {
                return;
            }
            const s = isString(state) ? state.toLowerCase() : state;
            const on =
                s === 'on' || s === 'start' || s === 'active' || s === true;
            setWebcamOn(on);
        };

        client.on('user-updated', onUserUpdated);
        client.on('video-active-change', onVideoActiveChange);

        return () => {
            client.off('user-updated', onUserUpdated);
            client.off('video-active-change', onVideoActiveChange);
        };
    }, [client, id]);

    return (
        <div className={cn('p-3 flex flex-row items-end', className)}>
            <div className="flex-grow">
                {webcamOn && (
                    <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                        {participant?.displayName + ' - ' + id}
                    </div>
                )}
            </div>

            {!micOn && (
                <div className="p-4 rounded-full bg-background/80 ms-2">
                    <MicOff className="w-4 h-4" />
                </div>
            )}
        </div>
    );
};

ParticipantFooter.displayName = 'ParticipantFooter';
