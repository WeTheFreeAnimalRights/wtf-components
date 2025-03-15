import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const MeetingDuration = ({ startedAt }) => {
    const [duration, setDuration] = useState('00:00');
    const [startTime, setStartTime] = useState(
        startedAt ? moment(startedAt) : moment()
    );

    useEffect(() => {
        if (!startedAt) {
            setStartTime(moment());
        }

        const updateDuration = () => {
            const now = moment();
            const diff = moment.duration(now.diff(startTime));
            setDuration(
                `${String(diff.minutes()).padStart(2, '0')}:${String(diff.seconds()).padStart(2, '0')}`
            );
        };

        updateDuration();
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    return <span className="text-muted-foreground">{duration}</span>;
};
