import { ParticipantFooter } from './ParticipantFooter';
import { ParticipantCamera } from './ParticipantCamera';
import { ParticipantAudio } from './ParticipantAudio';
import { useActiveSpeakers } from '../hooks/useActiveSpeakers';
import { useMeeting } from '../hooks/useMeeting';
import { cn } from '_/lib/utils';

export const ParticipantView = ({ id, className }) => {
    const { meeting } = useMeeting();
    const { client } = meeting;

    // Active speakers with decay (e.g., 1.5s of “linger” after last activity)
    const activeSpeakers = useActiveSpeakers(client, 1500, 250);
    const isActiveSpeaker = activeSpeakers.has(id);

    return (
        <div
            className={cn(
                'relative w-full h-full overflow-hidden rounded-md',
                className
            )}
        >
            {/* Inside border overlay */}
            <div
                className={cn(
                    'absolute inset-0 rounded-md pointer-events-none border-2 border-wtf-pink opacity-0 transition-opacity duration-500 z-10 w-full h-full',
                    isActiveSpeaker && 'opacity-100'
                )}
            />

            <div className="bg-gray-900 relative w-full h-full">
                <ParticipantCamera id={id} />
                <ParticipantAudio id={id} />
                <ParticipantFooter
                    id={id}
                    className="absolute bottom-0 left-0 right-0"
                />
            </div>
        </div>
    );
};

ParticipantView.displayName = 'ParticipantView';
