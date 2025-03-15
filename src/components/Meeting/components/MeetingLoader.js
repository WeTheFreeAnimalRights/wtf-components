import { Preloader } from '../../Preloader';
import { RoomView } from './RoomView';

export const MeetingLoader = ({ id, children }) => {
    const requests = [
        {
            url: 'chats',
            api: 'public',
            method: 'get',
            segments: [id],
            callback: ({ data }) => {
                return data.data;
            },
        },
    ];

    const repeatUntil = (data) => {
        return Boolean(data[0].activist);
    };

    return (
        <Preloader
            requests={requests}
            customPreloader={() => <RoomView />}
            repeatUntil={repeatUntil}
        >
            {children}
        </Preloader>
    );
};
