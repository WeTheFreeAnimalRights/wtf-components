import React, { useEffect, useRef } from 'react';
import { cn } from '_/lib/utils';

export const AutoScrollContainer = ({ children, className }) => {
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [children]);

    return (
        <div
            ref={containerRef}
            className={cn('overflow-auto', className)}
            data-testid="container"
        >
            {children}
        </div>
    );
};
