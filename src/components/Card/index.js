import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { CardImage } from './CardImage';

import {
    Card as ShadCard,
    CardHeader as ShadCardHeader,
    CardTitle as ShadCardTitle,
    CardDescription as ShadCardDescription,
    CardContent as ShadCardContent,
    CardImage as ShadCardImage,
} from '_/components/card';

export const Card = forwardRef(({
    layout = 'vertical',
    onClick,
    className = '',
    highlighted = false,
    children,

    image = '',
    title = '',
    description = '',
},ref ) => {
    const clickable = typeof onClick === 'function';
    return (
        <ShadCard
            className={[{
                'sm:flex sm:flex-row sm:items-stretch': layout === 'horizontal',
                'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer':
                    clickable,
            }, className]}
            onClick={onClick}
            ref={ref}
        >
            {image && (
                <>
                    <ShadCardImage
                        src={image}
                        className={layout === 'horizontal' ? 'sm:w-1/3' : ''}
                    />
                </>
            )}
            <div className="flex-grow basis-0">
                {(title || description) &&
                    <ShadCardHeader>
                        {title && <ShadCardTitle>{title}</ShadCardTitle>}
                        {description && (
                            <ShadCardDescription>{description}</ShadCardDescription>
                        )}
                    </ShadCardHeader>
}
                {children && <ShadCardContent className={!title && !description ? 'pt-6' : ''}>{children}</ShadCardContent>}
            </div>
        </ShadCard>
    );
});

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
    title: PropTypes.string,

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
};
