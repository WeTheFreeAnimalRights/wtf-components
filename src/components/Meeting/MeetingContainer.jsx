import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { MeetingContext } from './components/MeetingContext';
import { MeetingProvider } from './components/MeetingProvider';

export const MeetingContainer = ({ auth, visitor, children }) => {
    const [meeting, setFullMeeting] = useState({
        auth,
        visitor,

        // TODO: Check these
        micOn: true,
        camOn: true,
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
                [args[0]]: args[1],
            });
        }
    };

    // Memoize context value to prevent unnecessary re-renders
    const meetingContextValue = useMemo(
        () => ({ meeting, setMeeting }),
        [meeting]
    );

    return (
        <MeetingContext.Provider value={meetingContextValue}>
            <MeetingProvider>{children}</MeetingProvider>
        </MeetingContext.Provider>
    );
};

MeetingContainer.displayName = 'MeetingContainer';

MeetingContainer.propTypes = {
    /**
     * The auth for zoom
     */
    auth: PropTypes.object.isRequired,

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
};
