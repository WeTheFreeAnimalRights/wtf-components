import { useState } from 'react';
import PropTypes from 'prop-types';
import { MeetingProvider } from '@videosdk.live/react-sdk';
import { RoomView } from './RoomView';
import { ChatView } from './ChatView';
import { getRoomStatuses } from './helpers/getRoomStatuses';
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from '_/components/resizable';
import { Button } from '../Button';
import {
    MessageCircle,
    MessageCircleOff,
    Mic,
    MicOff,
    Video,
    VideoOff,
} from 'lucide-react';
import { ToggleButton } from './components/ToggleButton';

export const MeetingView = ({
    id,
    token,
    visitor,
    options,
    autoJoin = true,
}) => {
    const statuses = getRoomStatuses();
    const [status, setStatus] = useState(statuses.disconnected);
    const [chatVisible, setChatVisible] = useState(false);
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

    return (
        <MeetingProvider
            config={{
                meetingId: id,
                micEnabled: micOn,
                webcamEnabled: cameraOn,
                name: visitor.name,
                participantId: visitor.id,
                meta: {
                    email: visitor.email,
                },
                ...options,
            }}
            token={token}
            joinWithoutUserInteraction={autoJoin}
        >
            <div className="h-[768px]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel className="flex flex-col">
                        <RoomView
                            id={id}
                            status={status}
                            onStatusChange={setStatus}
                            micOn={micOn}
                            cameraOn={cameraOn}
                        />
                        {status === statuses.joined && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-sidebar-border border-t space-x-4 flex flex-row justify-between items-center">
                                <div className="space-x-4">
                                    <ToggleButton
                                        components={{
                                            on: Mic,
                                            off: MicOff,
                                        }}
                                        value={micOn}
                                        onChange={setMicOn}
                                    />
                                    <ToggleButton
                                        components={{
                                            on: Video,
                                            off: VideoOff,
                                        }}
                                        value={cameraOn}
                                        onChange={setCameraOn}
                                    />
                                </div>
                                <ToggleButton
                                    components={{
                                        on: MessageCircle,
                                        off: MessageCircleOff,
                                    }}
                                    value={chatVisible}
                                    onChange={setChatVisible}
                                />
                            </div>
                        )}
                    </ResizablePanel>

                    {chatVisible && status === statuses.joined && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel
                                className="p-4 bg-gray-50 dark:bg-gray-900"
                                defaultSize={25}
                                maxSize={50}
                                minSize={20}
                            >
                                <ChatView
                                    id={id}
                                    userId={visitor.id}
                                    onStatusChange={setStatus}
                                />
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
        </MeetingProvider>
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
};
