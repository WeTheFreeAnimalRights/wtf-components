import { isFunction, isUndefined } from 'lodash';
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
import { CardActiveTitle } from './CardActiveTitle';

export const Card = forwardRef(
    (
        {
            layout = 'vertical',
            onClick,
            className = '',
            headerClassName = '',
            contentClassName = '',
            descriptionClassName = '',
            imageClassName = '',
            imageFit = 'cover',
            size = 'md',
            highlighted = false,
            children,

            image = '',
            title = '',
            active,
            activeLabels,
            description = '',
            customizer = false,
        },
        ref
    ) => {
        const clickable = isFunction(onClick);
        return (
            <ShadCard
                className={cn(
                    layout === 'horizontal'
                        ? size === 'sm'
                            ? 'flex flex-row items-stretch'
                            : 'sm:flex sm:flex-row sm:items-stretch'
                        : '',
                    clickable
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-xl transition-all cursor-pointer'
                        : '',
                    className
                )}
                onClick={onClick}
                ref={ref}
                customizer={customizer}
            >
                {image && (
                    <>
                        <ShadCardImage
                            src={image}
                            alt={title}
                            fit={imageFit}
                            className={cn(
                                imageClassName,
                                layout === 'horizontal'
                                    ? size === 'md'
                                        ? 'sm:w-1/3'
                                        : 'w-1/4'
                                    : ''
                            )}
                            customizer={customizer}
                        />
                    </>
                )}
                <div className="flex flex-col flex-grow basis-0">
                    {(title || description) && (
                        <ShadCardHeader
                            className={headerClassName}
                            size={size}
                            layout={layout}
                            customizer={customizer}
                        >
                            {title && (
                                <ShadCardTitle
                                    size={size}
                                    customizer={customizer}
                                >
                                    {isUndefined(active) ? (
                                        title
                                    ) : (
                                        <CardActiveTitle
                                            active={active}
                                            labels={activeLabels}
                                        >
                                            {title}
                                        </CardActiveTitle>
                                    )}
                                </ShadCardTitle>
                            )}
                            {description && (
                                <ShadCardDescription
                                    size={size}
                                    customizer={customizer}
                                    className={descriptionClassName}
                                >
                                    {description}
                                </ShadCardDescription>
                            )}
                        </ShadCardHeader>
                    )}
                    {children && (
                        <ShadCardContent
                            className={cn(
                                !title && !description
                                    ? size === 'md'
                                        ? 'pt-6'
                                        : 'pt-3'
                                    : '',
                                contentClassName
                            )}
                            size={size}
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
     * Optional size of the card
     */
    size: PropTypes.oneOf(['sm', 'md']),

    /**
     * Optional to show a checkbox if the item is active or not
     */
    active: PropTypes.bool,

    /**
     * Optional extra classname to the card header
     */
    headerClassName: PropTypes.string,

    /**
     * Optional extra classname to the card content
     */
    contentClassName: PropTypes.string,
};
