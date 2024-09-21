import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
    Card as ShadCard,
    CardHeader as ShadCardHeader,
    CardTitle as ShadCardTitle,
    CardDescription as ShadCardDescription,
    CardContent as ShadCardContent,
    CardImage as ShadCardImage,
} from '_/components/card';
import { cn } from '_/lib/utils';

export const Card = forwardRef(
    (
        {
            layout = 'vertical',
            onClick,
            className = '',
            headerClassName = '',
            contentClassName = '',
            highlighted = false,
            children,

            image = '',
            title = '',
            description = '',
        },
        ref
    ) => {
        const clickable = typeof onClick === 'function';
        return (
            <ShadCard
                className={[
                    {
                        'sm:flex sm:flex-row sm:items-stretch':
                            layout === 'horizontal',
                        'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer':
                            clickable,
                    },
                    className,
                ]}
                onClick={onClick}
                ref={ref}
            >
                {image && (
                    <>
                        <ShadCardImage
                            src={image}
                            alt={title}
                            className={
                                layout === 'horizontal' ? 'sm:w-1/3' : ''
                            }
                        />
                    </>
                )}
                <div className="flex-grow basis-0">
                    {(title || description) && (
                        <ShadCardHeader className={headerClassName}>
                            {title && <ShadCardTitle>{title}</ShadCardTitle>}
                            {description && (
                                <ShadCardDescription>
                                    {description}
                                </ShadCardDescription>
                            )}
                        </ShadCardHeader>
                    )}
                    {children && (
                        <ShadCardContent
                            className={cn(
                                !title && !description ? 'pt-6' : '',
                                contentClassName
                            )}
                        >
                            {children}
                        </ShadCardContent>
                    )}
                </div>
            </ShadCard>
        );
    }
);
Card.displayName = 'Card';

Card.propTypes = {
    /**
     * Layout of the card component
     */
    layout: PropTypes.oneOf(['horizontal', 'vertical']),

    /**
     * Is the card highlighted or not
     */
    highlighted: PropTypes.bool,

    /**
     * Image to be shown on the card component
     */
    image: PropTypes.string,

    /**
     * Title to be shown on the card component
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * Description to be shown on the card component
     */
    description: PropTypes.string,

    /**
     * Optional click handler (called when the user clicks the card)
     */
    onClick: PropTypes.func,

    /**
     * Optional extra classname to the card
     */
    className: PropTypes.string,

    /**
     * Optional extra classname to the card header
     */
    headerClassName: PropTypes.string,

    /**
     * Optional extra classname to the card content
     */
    contentClassName: PropTypes.string,
};
