import React from 'react';
import PropTypes from 'prop-types';
import { getButtonClasses } from './getButtonClasses';

export const Button = ({
    theme = 'full',
    type = 'button',
    full = false,
    onClick,
    children,
    disabled = false,
    className = '',

    // In case it's a link
    href,
    target,
}) => {
    let Tag = 'button';
    if (type === 'link') {
        Tag = 'a';
    }

    const buttonClasses = getButtonClasses({ full, theme });

    return (
        <Tag
            role="button"
            type={type}
            className={`${className || ''} ${buttonClasses.wrapper} ${buttonClasses.text}`}
            onClick={onClick}
            href={href}
            target={target}
            disabled={disabled}
        >
            {children}
        </Tag>
    );
};

Button.propTypes = {
    /**
     * The theme of the button - this controls the overall look of the button
     */
    theme: PropTypes.oneOf(['empty', 'half', 'half-empty', 'full', 'wtf-pink']),

    /**
     * The html button type. If this is set to "link", then the button becomes
     * a link
     */
    type: PropTypes.oneOf(['button', 'submit', 'link']),

    /**
     * Is this button gonna have a full width or not
     */
    full: PropTypes.bool,

    /**
     * Is this button disabled or not
     */
    disabled: PropTypes.bool,

    /**
     * If it's a link, what's its href
     */
    href: PropTypes.string,

    /**
     * If it's a link, what's its target
     */
    target: PropTypes.string,

    /**
     * Optional click handler
     */
    onClick: PropTypes.func,

    /**
     * Optional extra classname to the card
     */
    className: PropTypes.string,
};

// <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
// <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
// <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
// <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button>
// <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
// <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
// <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
// <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
