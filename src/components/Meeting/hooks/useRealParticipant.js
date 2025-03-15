import { useState, useEffect } from 'react';
import { useParticipant } from '@videosdk.live/react-sdk';
import { useChatVisitor } from './useChatVisitor';

export const useRealParticipant = (id) => {
    const [webcamStream, setWebcamStream] = useState(null);
    const [micStream, setMicStream] = useState(null);
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);

    const { chatVisitor } = useChatVisitor();
    const videoSdkParticipant = useParticipant(id);
    const participant = id ? videoSdkParticipant : null;

    const hasParticipant = Boolean(id && participant);

    useEffect(() => {
        if (!hasParticipant) {
            // Local user: Access camera & mic
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    const videoTrack = stream.getVideoTracks()[0];
                    const audioTrack = stream.getAudioTracks()[0];

                    setWebcamStream({
                        track: videoTrack || null,
                    });
                    setMicStream({
                        track: audioTrack || null,
                    });

                    setWebcamOn(!!videoTrack);
                    setMicOn(!!audioTrack);
                })
                .catch((error) => {
                    console.error('Error accessing media devices:', error);
                });
        }

        return () => {
            // Cleanup function to stop tracks when unmounting
            webcamStream?.stop?.();
            micStream?.stop?.();
        };
    }, [id]);

    return {
        // Audio properties
        micStream: hasParticipant ? participant?.micStream : micStream,
        micOn: hasParticipant ? participant?.micOn : micOn,
        isLocal: hasParticipant ? participant?.isLocal : true, // True if it's the local user

        // Video properties
        webcamStream: hasParticipant ? participant?.webcamStream : webcamStream,
        webcamOn: hasParticipant ? participant?.webcamOn : webcamOn,
        participant: hasParticipant ? participant?.participant : chatVisitor, // Fallback to Recoil store

        // Name properties
        isActiveSpeaker: hasParticipant ? participant?.isActiveSpeaker : false,
    };
};
