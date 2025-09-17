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
            const hours = Math.floor(diffInSeconds / 3600);
            const secondsLeft = diffInSeconds - hours * 3600;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;

            setDuration(
                `${hours ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        };

        updateDuration();
        const interval = setInterval(updateDuration, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    return <span className="text-muted-foreground">{duration}</span>;
};

MeetingDuration.displayName = 'MeetingDuration';
