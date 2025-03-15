import React, { useState, useRef, useEffect } from 'react';
import { cn } from '_/lib/utils';
import moment from 'moment';
import { Image } from '../../Image';

export const SpeechBubble = ({
    children,
    received = false,
    tail = true,
    author = false,
    timestamp = false,
    className,
    item,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(textRef.current.scrollHeight > 80); // Adjusted threshold (80px = ~4-5 lines)
        }
    }, [children]);

    return (
        <div
            className={cn(
                'relative rounded-lg w-2/3 text-sm',
                received
                    ? 'bg-muted text-foreground ms-3 me-auto'
                    : 'bg-primary text-white ms-auto me-3',
                item.type === 'message' && 'p-2',
                item.type === 'resource' && 'p-1',
                className
            )}
        >
            {/* Author (if provided) */}
            {author && (
                <div className="font-bold text-primary mb-1">{author}</div>
            )}

            {/* Message Content with Read More */}
            {item.type === 'message' && (
                <span
                    ref={textRef}
                    className={cn(
                        'relative whitespace-pre-wrap break-words inline-block w-full transition-all',
                        expanded ? 'max-h-full' : 'max-h-20 overflow-hidden'
                    )}
                >
                    {children}

                    {(expanded || !isOverflowing) && timestamp && (
                        <span className="inline-flex items-end float-end text-xs text-white opacity-75 ms-2 mt-1 whitespace-nowrap">
                            {moment(timestamp).format('hh:mm A')}
                        </span>
                    )}
                </span>
            )}

            {item.type === 'resource' && (
                <div className="w-full h-auto bg-black/30 rounded-md relative z-10">
                    <Image
                        src={item.resource.image}
                        className="rounded-md w-full aspect-video overflow-hidden"
                    />
                    <div className="p-2">
                        <h2 className="text-md font-semibold">
                            {item.resource.title}
                        </h2>
                        <div
                            className={cn(
                                'mt-1 text-xs line-clamp-2',
                                received
                                    ? 'text-foreground/70'
                                    : 'text-white/70'
                            )}
                        >
                            {item.resource.description}
                        </div>
                    </div>
                </div>
            )}

            {/* Read More Button (Only if Text Overflows) */}
            {!expanded && isOverflowing && (
                <button
                    onClick={() => setExpanded(true)}
                    className="text-xs text-muted-foreground underline mt-1"
                >
                    Read more
                </button>
            )}

            {/* Floating Timestamp (always at bottom-right) */}
            {!expanded && isOverflowing && timestamp && (
                <span className="inline-flex items-end float-end text-xs text-muted-foreground opacity-75 ms-2 mt-1 whitespace-nowrap">
                    {moment(timestamp).format('hh:mm A')}
                </span>
            )}

            {/* Speech bubble tail */}
            {tail && (
                <svg
                    className={cn(
                        'absolute bottom-0 w-6 h-5',
                        received
                            ? 'start-[-9px] text-muted'
                            : 'end-[-9px] text-primary'
                    )}
                    viewBox="0 0 14 12"
                >
                    <path
                        d={
                            received
                                ? 'M14 12 Q7 -2, 0 12 Q7 9, 14 12 Z'
                                : 'M0 12 Q7 -2, 14 12 Q7 9, 0 12 Z'
                        }
                        fill="currentColor"
                    />
                </svg>
            )}
        </div>
    );
};
