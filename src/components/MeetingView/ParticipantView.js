import { useEffect, useMemo, useRef } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';

export const ParticipantView = ({ id }) => {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal } =
        useParticipant(id);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

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

    console.log('>>videoStream', videoStream);

    return (
        <div>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={'300px'}
                    width={'300px'}
                    onError={(err) => {
                        console.log(err, 'participant video error');
                    }}
                />
            )}
        </div>
    );
};
