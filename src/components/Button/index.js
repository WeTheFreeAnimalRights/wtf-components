import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Link, Text } from 'react-native';

export const Button = ({
    theme = 'full',
    type = 'button',
    full = false,
    onPress,
    children,
    className = '',
    href,
    target,
}) => {
    // Classes to be used for the button or the link
    const wrapperClasses = `${className || ''}
        inline-block group cursor-pointer
        ${full ? 'w-full' : ''}
        ${theme === 'full' ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300' : ''}
        ${theme === 'half' ? 'border border-gray-200 bg-white hover:bg-gray-100 focus:ring-gray-100' : ''}
        ${theme === 'empty' ? 'rounded-md' : ''}
        ${theme === 'wtf-pink' ? 'bg-wtf-pink hover:bg-gray-900 focus:ring-wtf-pink' : ''}
        focus:ring-4 focus:outline-none
        font-medium text-sm
        text-center
        ${theme === 'full' ? 'rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : ''}
        ${theme === 'half' ? 'rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600' : ''}
        ${theme === 'wtf-pink' ? 'rounded-full px-8 py-3' : ''}
    `;

    // Text part of the button
    const textPart = (
        <Text
            className={`
                ${theme === 'full' ? 'text-white' : ''}
                ${theme === 'half' ? 'text-gray-900 group-hover:text-blue-700 dark:text-gray-400 dark:group-hover:text-white' : ''}
                ${theme === 'empty' ? 'underline text-black hover:text-blue-700 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white' : ''}
                ${theme === 'wtf-pink' ? 'text-white' : ''}
            `}
        >
            {children}
        </Text>
    );

    // In case it's a link
    if (type === 'link') {
        return (
            <a
                className={wrapperClasses}
                onClick={onPress}
                href={href}
                target={target}
            >
                {textPart}
            </a>
        );
    }

    // By default it's a button
    return (
        <Pressable className={wrapperClasses} onPress={onPress} role="button">
            {textPart}
        </Pressable>
    );
};

Button.propTypes = {
    /**
     * The theme of the button - this controls the overall look of the button
     */
    theme: PropTypes.oneOf(['empty', 'half', 'full', 'wtf-pink']),

    /**
     * The html button type. If this is set to "link", then the button becomes
     * a link
     */
    type: PropTypes.oneOf(['button', 'link']),

    /**
     * Is this button gonna have a full width or not
     */
    full: PropTypes.bool,

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
    onPress: PropTypes.func,

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
