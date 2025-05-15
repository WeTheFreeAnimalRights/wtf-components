import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

export const MeetingDuration = ({ startedAt }) => {
    const [duration, setDuration] = useState('00:00');
    const [startTime, setStartTime] = useState(new Date(startedAt));

    useEffect(() => {
        if (!startedAt) {
            setStartTime(new Date());
        }

        const updateDuration = () => {
            const now = new Date();
            const diffInSeconds = differenceInSeconds(now, startTime);
            const minutes = Math.floor(diffInSeconds / 60);
            const seconds = diffInSeconds % 60;

            setDuration(
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        };

        updateDuration();
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    return <span className="text-muted-foreground">{duration}</span>;
};
