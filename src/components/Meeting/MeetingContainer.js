
import PropTypes from 'prop-types';
import { MeetingContext } from './components/MeetingContext';
import { MeetingProvider } from './components/MeetingProvider';
import { useState } from 'react';

export const MeetingContainer = ({
    id,
    token,
    visitor,
    options,
    autoJoin = true,
    children,

    initialMicOn = true,
    initialCamOn = true,
}) => {
    const [meeting, setFullMeeting] = useState({
        id,
        token,
        visitor,
        options,
        autoJoin,
        micOn: initialMicOn,
        camOn: initialCamOn,
    });

    const setMeeting = (...args) => {
        if (args.length === 1) {
            setFullMeeting({
                ...meeting,
                ...args[0],
            });
        } else if (args.length === 2) {
            setFullMeeting({
                ...meeting,
                [args[0]]: [args[1]],
            });
        }
    };

    return (
        <MeetingContext.Provider value={{ meeting, setMeeting }}>
            <MeetingProvider>{children}</MeetingProvider>
        </MeetingContext.Provider>
    );
};

MeetingContainer.displayName = 'MeetingContainer';

MeetingContainer.propTypes = {
    /**
     * The ID of the room (leave empty to create one)
     */
    id: PropTypes.string,

    /**
     * The token to for videosdk
     */
    token: PropTypes.string.isRequired,

    /**
     * Visitor info
     */
    visitor: PropTypes.shape({
        /**
         * The ID of the visitor
         */
        id: PropTypes.number,

        /**
         * The name of the visitor
         */
        name: PropTypes.string,

        /**
         * The email of the visitor
         */
        email: PropTypes.string,
    }),

    /***
     * Optional object of options to be passed on to the MeetingProvider
     */
    options: PropTypes.object,

    /**
     * Optional whether to autoJoin the meeting or not
     */
    autoJoin: PropTypes.bool,

    /**
     * Optional whether to start with the microphone on or not
     */
    initialMicOn: PropTypes.bool,

    /**
     * Optional whether to start with the camera on or not
     */
    initialCamOn: PropTypes.bool,
};
