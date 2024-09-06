import React from 'react';

export const CardImage = ({
    layout = 'vertical',
    src,
    name,
    highlighted,
    className = '',

    // For the vertical layout
    aspect = 'video',
}) => {
    return (
        <>
            <figure
                className={`${className}
                    items-center flex
                    ${highlighted ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white' : 'bg-gray-300 dark:bg-gray-900 text-white dark:text-black'}
                    ${layout === 'vertical' ? 'rounded-t-md' : ''}
                    ${layout === 'horizontal' ? `sm:w-1/3 sm:h-full rounded-t-md sm:rounded-t-none sm:rounded-l-md` : ''}
                `}
            >
                <img
                    src={src}
                    alt={name}
                    className={`
                        w-full object-cover
                        ${layout === 'vertical' ? `rounded-t-md aspect-${aspect}` : ''}
                        ${layout === 'horizontal' ? 'rounded-t-md sm:rounded-t-none sm:rounded-l-md sm:h-full sm:max-h-48' : ''}
                    `}
                />
                <figcaption className="sr-only">{name}</figcaption>
            </figure>
        </>
    );
};
