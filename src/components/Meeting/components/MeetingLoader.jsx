import { useState } from 'react';
import { isEqual } from 'lodash-es';
import { Preloader } from '../../Preloader';
import { useTranslations } from '../../../hooks/useTranslations';
import { ChatSocketInitializer } from './ChatSocketInitializer';

export const MeetingLoader = ({ id, children, className, cancelUrl, socketConfig }) => {
    const { t } = useTranslations();
    const [meeting, setMeeting] = useState({});

    const requests = [
        {
            url: 'chats',
            api: 'public',
            method: 'get',
            segments: [id],
            callback: ({ data }) => {
                setMeeting((prev) => {
                    if (!prev?.id || !prev?.roomId) {
                        return data.data;
                    }
                    return prev;
                });
                return data.data;
            },
        },
    ];

    const repeatUntil = (data) => {
        return Boolean(data[0].activist);
    };

    return (
        <>
            {socketConfig && meeting?.id && meeting?.roomId ? (
                <ChatSocketInitializer
                    key={`${meeting.id}-${meeting.roomId}`}
                    meeting={meeting}
                    socketConfig={socketConfig}
                />
            ) : null}
            <Preloader
                requests={requests}
                loadingMessage={t('waiting-for-activist')}
                repeatUntil={repeatUntil}
                cancelUrl={cancelUrl}
                className={className}
            >
                {children}
            </Preloader>
        </>
    );
};

MeetingLoader.displayName = 'MeetingLoader';
