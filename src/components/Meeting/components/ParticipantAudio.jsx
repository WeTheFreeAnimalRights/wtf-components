import { useEffect, useRef } from 'react';
import { useRealParticipant } from '../hooks/useRealParticipant';

export const ParticipantAudio = ({ id }) => {
    const micRef = useRef(null);
    const { micStream, micOn, isLocal } = useRealParticipant(id);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error('videoElem.current.play() failed', error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return <audio ref={micRef} autoPlay playsInline muted={isLocal} />;
};
