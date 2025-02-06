import { useState } from 'react';
import { isFunction } from 'lodash-es';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import { Preloader } from '../Preloader';
import { RoomView } from './RoomView';
import PropTypes from 'prop-types';

const url = 'https://api.videosdk.live/v2/rooms';

export const MeetingView = ({ id, token, onMeetingId, options }) => {
    const [meetingId, setMeetingId] = useState(id);
    const requests = [
        {
            url,
            method: id ? 'get' : 'post',
            authorization: token,
            segments: id ? ['validate', id] : [],
            callback: ({ data }) => {
                if (data.roomId) {
                    setMeetingId(data.roomId);

                    // Callback if any
                    if (isFunction(onMeetingId)) {
                        onMeetingId(data.roomId);
                    }
                } else {
                    throw new Error('Could not fetch ROOM ID');
                }
            },
        },
    ];

    return (
        <Preloader requests={requests} refetch={[id]}>
            <>
                {meetingId && (
                    <MeetingProvider
                        config={{
                            meetingId,
                            micEnabled: true,
                            webcamEnabled: true,
                            ...options,
                            name: "Ciprian's Org",
                            participantId: 'idd',
                        }}
                        token={token}
                    >
                        <RoomView />
                    </MeetingProvider>
                )}
            </>
        </Preloader>
    );
};

MeetingView.displayName = 'MeetingView';

MeetingView.propTypes = {
    /**
     * The ID of the room (leave empty to create one)
     */
    id: PropTypes.string,

    /**
     * The token to for videosdk
     */
    token: PropTypes.string.isRequired,

    /**
     * Optional callback when the meeting id is got (if none is provided)
     */
    onMeetingId: PropTypes.func,

    /***
     * Optional object of options to be passed on to the MeetingProvider
     */
    options: PropTypes.object,
};
