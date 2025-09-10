import { ParticipantFooter } from './ParticipantFooter';
import { ParticipantCamera } from './ParticipantCamera';
// import { ParticipantAudio } from './ParticipantAudio';
import { cn } from '_/lib/utils';

export const ParticipantView = ({ id, className }) => {
    return (
        <div
            className={cn(
                'relative w-full max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-md',
                className
            )}
        >
            <div className="bg-gray-900 w-full h-full flex items-center justify-center">
                <ParticipantCamera id={id} />
                {/* <ParticipantFooter
                    id={id}
                    className="absolute bottom-0 left-0 right-0"
                /> */}
            </div>
        </div>
    );
};
