import { useMemo } from 'react';
import ReactPlayer from 'react-player';
import { AnimalIcon } from '../../AnimalIcon';
import { useRealParticipant } from '../hooks/useRealParticipant';

export const ParticipantCamera = ({ id, animalIndex = 2 }) => {
    const { webcamStream, webcamOn, participant } = useRealParticipant(id);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [id, webcamStream, webcamOn]);

    if (webcamOn) {
        return (
            <ReactPlayer
                playsinline // very very imp prop
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={videoStream}
                onError={(err) => {
                    console.log(err, 'participant video error');
                }}
                width="100%"
                height="100%"
                className="[&>video]:object-cover"
            />
        );
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <AnimalIcon variant="light" index={animalIndex} />
            <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                {participant.displayName}
            </div>
        </div>
    );
};
