import { useState } from 'react';
import { Star } from 'lucide-react';
import { isFunction, isUndefined } from 'lodash-es';

import { Spinner } from '../Spinner';
import { useTranslations } from '../../hooks/useTranslations';
import { useRequest } from '../../hooks/useRequest';
import { cn } from '_/lib/utils';

export const StarRating = ({
    initialRating = 0,
    staticMode = false,
    onRate,

    // Class names
    fillClassName,
    starClassName,
    containerClassName,

    // For requests
    chatId = 0,
    meetingId,
    token,
}) => {
    const { t } = useTranslations();
    const [rating, setRating] = useState(initialRating);
    const [hoveredStar, setHoveredStar] = useState(0);

    const { loading, request } = useRequest();

    const extractTitleAndDescription = (input) => {
        const match = input.match(/^(.*?)\s*\((.*?)\)$/);

        if (match) {
            return {
                title: match[1].trim(),
                description: match[2].trim(),
            };
        }

        return { title: input.trim(), description: '' };
    };

    const messages = {
        1: extractTitleAndDescription(t('chat-star-rating-1')),
        2: extractTitleAndDescription(t('chat-star-rating-2')),
        3: extractTitleAndDescription(t('chat-star-rating-3')),
        4: extractTitleAndDescription(t('chat-star-rating-4')),
        5: extractTitleAndDescription(t('chat-star-rating-5')),
    };

    const ratingTag = token ? 'activistRating' : 'visitorRating';

    const save = async (stars = 0) => {
        setRating(stars);

        await request(
            {
                url: 'chats',
                api: token ? 'private' : 'public',
                segments: [chatId],
                method: 'put',
                bearer: token,
                body: token
                    ? {
                          activist_rating: stars,
                      }
                    : {
                          visitor_rating: stars,
                          meeting_id: meetingId,
                      },
            },
            undefined,
            (data) => {
                if (!isUndefined(data.data[ratingTag])) {
                    setRating(data.data[ratingTag]);
                }

                if (isFunction(onRate)) {
                    onRate(stars);
                }
            }
        );
    };

    const displayRating = hoveredStar || rating;

    return (
        <div
            className={cn(
                'flex flex-col relative',
                !staticMode && 'items-center '
            )}
        >
            {loading && (
                <div className="absolute left-0 top-0 right-0 bottom-0 bg-background/90 z-10 text-center">
                    <Spinner className="inline-block w-8 h-8" />
                </div>
            )}
            <div
                className={cn('flex space-x-1', containerClassName)}
                onMouseLeave={() => !staticMode && setHoveredStar(0)}
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <div
                        key={star}
                        className="relative"
                        onMouseEnter={() => !staticMode && setHoveredStar(star)}
                    >
                        <Star
                            className={cn(
                                'w-8 h-8 transition-colors',
                                displayRating >= star
                                    ? fillClassName ||
                                          'fill-wtf-pink text-wtf-pink'
                                    : 'text-gray-400',
                                !staticMode && 'cursor-pointer',
                                starClassName
                            )}
                            onClick={() => !staticMode && save(star)}
                        />
                        {displayRating >= star - 0.5 &&
                            displayRating < star && (
                                <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden">
                                    <Star
                                        className={cn(
                                            'w-8 h-8 fill-wtf-pink text-wtf-pink',
                                            fillClassName,
                                            starClassName
                                        )}
                                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                                    />
                                </div>
                            )}
                    </div>
                ))}
            </div>
            {!staticMode && rating > 0 && (
                <div className="flex flex-col items-center mt-2">
                    <p className="text-lg font-semibold text-gray-700 text-center">
                        {messages[Math.round(rating)].title}
                    </p>
                    {messages[Math.round(rating)].description && (
                        <p className="text-md text-gray-500 text-center w-3/4">
                            {messages[Math.round(rating)].description}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

StarRating.displayName = 'StarRating';
