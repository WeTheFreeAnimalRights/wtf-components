import React, { useState, useRef, useEffect } from 'react';
import { Image } from '../../Image';
import { useTranslations } from '../../../hooks/useTranslations';
import { useFormatDate } from '../../../hooks/useFormatDate';
import { cn } from '_/lib/utils';

export const SpeechBubble = ({
    children,
    received = false,
    tail = true,
    author = false,
    timestamp = false,
    className,
    item,
}) => {
    const { t } = useTranslations();
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(textRef.current.scrollHeight > 500);
            // Adjusted threshold (80px = ~4-5 lines)
        }
    }, [children]);

    const formatDate = useFormatDate();
    const formattedDate = formatDate(new Date(timestamp), 'hh:mm a');

    return (
        <div
            className={cn(
                'relative rounded-lg w-2/3 text-sm',
                received
                    ? 'bg-muted text-foreground ms-3 me-auto'
                    : 'bg-[#1e293b] text-white ms-auto me-3',
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
                        <span
                            className={cn(
                                'inline-flex items-end float-end text-xs opacity-75 ms-2 mt-1 whitespace-nowrap',
                                received
                                    ? 'text-foreground/70'
                                    : 'text-white/70'
                            )}
                        >
                            {formattedDate}
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
                    <div className="p-2 pt-0 text-sm italic">
                        {t('resource-not-clickable')}
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
                    {formattedDate}
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
                        fill="#1e293b"
                    />
                </svg>
            )}
        </div>
    );
};

SpeechBubble.displayName = 'SpeechBubble';
