import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimalIcon } from '../../AnimalIcon';
import { useMeeting } from '../hooks/useMeeting';

export const ParticipantCamera = ({ id, animalIndex = 2 }) => {
    const ref = useRef(null);
    const { meeting } = useMeeting();
    const { client } = meeting;

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

    // Attach/detach video DOM when state flips
    useEffect(() => {
        const stream = client.getMediaStream();
        let mounted = true;

        const attach = async () => {
            if (!videoOn) {
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
            try {
                stream.detachVideo(id);
            } catch (err) {
                console.error('detachVideo error:', err);
            }
            if (ref.current) {
                ref.current.innerHTML = '';
            }
        };

        if (videoOn) {
            attach();
        } else {
            detach();
        }

        return () => {
            mounted = false;
            detach();
        };
    }, [client, id, videoOn]);

    if (videoOn) {
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
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 py-4 box-border">
            <AnimalIcon variant="light" index={animalIndex} />
            <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                {participant?.displayName}
            </div>
        </div>
    );
};

ParticipantCamera.displayName = 'ParticipantCamera';
