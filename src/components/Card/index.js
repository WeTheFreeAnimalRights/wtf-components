import PropTypes from 'prop-types';
import { CardImage } from './CardImage';

export const Card = ({
    layout = 'vertical',
    onClick,
    className = '',
    highlighted = false,
    children,

    image = '',
    title = '',
    description = '',
}) => {
    const clickable = typeof onClick === 'function';
    return (
        <>
            <article
                className={`${className || ''}
                    rounded-lg shadow w-full
                    ${layout === 'horizontal' ? 'flex flex-row items-stretch' : ''}
                    ${clickable && !highlighted ? 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer' : ''}

                    ${highlighted ? 'border-4 border-gray-700 dark:border-gray-100 bg-gray-700 dark:bg-gray-100' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}
                    ${clickable && highlighted ? 'hover:bg-gray-600 dark:hover:bg-gray-50 cursor-pointer' : ''}
                `}
                onClick={onClick}
            >
                {image && (
                    <CardImage
                        layout={layout}
                        src={image}
                        name={title}
                        highlighted={highlighted}
                    />
                )}
                <div
                    className={`
                        p-5
                        ${layout === 'horizontal' ? 'flex-1' : ''}
                    `}
                >
                    {title && (
                        <h1
                            className={`
                            text-2xl font-bold tracking-tight
                            ${highlighted ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'}
                        `}
                        >
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p
                            className={`font-normal mt-3
                            ${highlighted ? 'text-gray-400 dark:text-gray-700' : 'text-gray-700 dark:text-gray-400'}
                        `}
                        >
                            {description}
                        </p>
                    )}
                    {children}
                </div>
            </article>
        </>
    );
};

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
