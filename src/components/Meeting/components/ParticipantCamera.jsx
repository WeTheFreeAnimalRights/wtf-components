import { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import { AnimalIcon } from '../../AnimalIcon';
import { useRealParticipant } from '../hooks/useRealParticipant';
import { useMeeting } from '../hooks/useMeeting';

export const ParticipantCamera = ({ id, animalIndex = 2 }) => {
    const {meeting} = useMeeting();
    const {client} = meeting;

    const userInfo = client.getCurrentUserInfo();
    const ref = useRef(null);

    useEffect(() => {
        const stream = client.getMediaStream();
        const attach = async () => {
            if (userInfo.userId === id) {
                await stream.startVideo();
            }

            const element = await stream.attachVideo(id, '1080P');
            if (ref && ref.current) {
                ref.current.appendChild(element);
            }
        }
        attach();
    }, []);

    //
    // const participant = client.getUser(id);

    // if (webcamOn) {
        return (
            <video-player-container>
                <div className="video-tile" ref={ref}></div>
            </video-player-container>
        );
    // }

    // return (
    //     <div className="flex flex-col items-center gap-2 py-4">
    //         <AnimalIcon variant="light" index={animalIndex} />
    //         <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
    //             {participant.displayName}
    //         </div>
    //     </div>
    // );
};
