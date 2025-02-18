import { useEffect, useMemo, useRef } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import { Badge } from '../../Badge';
import { useTranslations } from '../../../hooks/useTranslations';
import { cn } from '_/lib/utils';

export const ParticipantView = ({ id, className }) => {
    const micRef = useRef(null);
    const { t } = useTranslations();
    const {
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
        participant,
        isActiveSpeaker,
    } = useParticipant(id);

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

    return (
        <div className={cn('relative w-full max-w-full max-h-full aspect-video flex items-center justify-center overflow-hidden rounded-md', className)}>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <>
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
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-row items-center">
                        <div className="flex-grow">
                            <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                                {participant.displayName}
                            </div>
                        </div>

                        {isActiveSpeaker && <Badge>{t('speaking')}</Badge>}
                    </div>
                </>
            )}
        </div>
    );
};
