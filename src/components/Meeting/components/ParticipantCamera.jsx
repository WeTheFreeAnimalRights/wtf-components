import { useEffect, useMemo, useRef, useState } from 'react';
import { useMeeting } from '../hooks/useMeeting';
import { ParticipantNoCamera } from './ParticipantNoCamera';

export const ParticipantCamera = ({ id, animalIndex = 2 }) => {
    const ref = useRef(null);
    const meetingClosedRef = useRef(false);
    const { meeting } = useMeeting();
    const { client, camOn } = meeting;

    const participant = useMemo(() => client.getUser(id), [client, id]);
    const currentUser = useMemo(() => client.getCurrentUserInfo(), [client]);

    const [videoOn, setVideoOn] = useState(
        () => participant?.bVideoOn ?? false
    );

    // Keep local state in sync with SDK
    useEffect(() => {
        setVideoOn(client.getUser(id)?.bVideoOn ?? false);

        const onUserUpdated = () => {
            const p = client.getUser(id);
            if (p) {
                setVideoOn(!!p.bVideoOn);
            }
        };

        const onVideoActiveChange = ({ userId, state }) => {
            if (userId === id) {
                setVideoOn(state === 'Active');
            }
        };

        client.on('user-updated', onUserUpdated);
        client.on('video-active-change', onVideoActiveChange);

        return () => {
            client.off('user-updated', onUserUpdated);
            client.off('video-active-change', onVideoActiveChange);
        };
    }, [client, id]);

    // Start local AV if this tile is the local user and toggles say so
    useEffect(() => {
        const run = async () => {
            const stream = client.getMediaStream();
            if (currentUser?.userId === participant?.userId) {
                if (meeting.camOn) {
                    try {
                        await stream.startVideo();
                    } catch (err) {
                        console.error('startVideo error:', err);
                        setVideoOn(false);
                    }
                }
            }
        };
        run();
    }, [client, participant?.userId, currentUser?.userId, meeting.camOn]);

    // Track if the meeting/session has closed so we can skip SDK calls
    useEffect(() => {
        const onConnectionChange = ({ state }) => {
            if (state === 'Closed' || state === 'Disconnected') {
                meetingClosedRef.current = true;
            } else if (state === 'Connected' || state === 'Reconnected') {
                meetingClosedRef.current = false;
            }
        };

        client.on?.('connection-change', onConnectionChange);
        return () => {
            client.off?.('connection-change', onConnectionChange);
        };
    }, [client]);

    const isLocalUser = currentUser?.userId === participant?.userId;
    const shouldShowVideo = videoOn && (!isLocalUser || camOn);

    // Attach/detach video DOM when state flips
    useEffect(() => {
        const stream = client.getMediaStream();
        let mounted = true;

        const attach = async () => {
            if (!shouldShowVideo || meetingClosedRef.current) {
                return;
            }
            try {
                const el = await stream.attachVideo(id, '1080P');

                el.style.width = '100%';
                el.style.height = '100%';

                if (mounted && ref.current && el && !ref.current.contains(el)) {
                    ref.current.appendChild(el);
                    const video = el.querySelector('video');
                    if (video) {
                        const applyRatio = () => {
                            const w = video.videoWidth;
                            const h = video.videoHeight;
                            if (w && h) {
                                const ratio = w / h;
                                // Set wrapper aspect directly
                                if (ref.current) {
                                    ref.current.style.aspectRatio = `${w} / ${h}`;
                                }
                            }
                        };

                        if (video.readyState >= 1) {
                            applyRatio();
                        }
                        video.addEventListener('loadedmetadata', applyRatio);
                        video.addEventListener('resize', applyRatio);
                    }
                }
            } catch (err) {
                console.error('attachVideo error:', err);
            }
        };

        const detach = () => {
            if (meetingClosedRef.current) {
                if (ref.current) {
                    ref.current.innerHTML = '';
                }
                return;
            }

            try {
                stream.detachVideo(id);
            } catch (err) {
                console.error('detachVideo error:', err);
            }
            if (ref.current) {
                ref.current.innerHTML = '';
            }
        };

        if (shouldShowVideo) {
            attach();
        } else {
            detach();
        }

        return () => {
            mounted = false;
            detach();
        };
    }, [camOn, client, id, shouldShowVideo]);

    if (shouldShowVideo) {
        return (
            <video-player-container
                className="relative"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <div className="w-full h-full" ref={ref} />
            </video-player-container>
        );
    }

    return (
        <ParticipantNoCamera
            name={participant?.displayName}
            animalIndex={animalIndex}
        />
    );
};

ParticipantCamera.displayName = 'ParticipantCamera';
