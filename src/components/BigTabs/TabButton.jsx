import React from 'react';

export const TabButton = ({
    icon,

    first,
    last,

    selected,
    children,
    onClick,
}) => (
    <button
        className={`inline-block w-full h-full px-2 sm:px-4 py-3 sm:py-6 text-xs sm:text-md transition-colors
            ${
                selected
                    ? 'bg-gray-700 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-50'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
            }
            border-gray-200 dark:border-gray-700
            ${!first ? 'border-l' : ''}
            ${first ? 'rounded-s-lg' : ''}
            ${last ? 'rounded-e-lg' : ''}
            focus:ring-4 focus:ring-blue-300 active focus:outline-none`}
        onClick={onClick}
    >
        {icon && <div className="icon-container text-center mb-2">{icon}</div>}
        <div className="uppercase font-semibold">{children}</div>
    </button>
);
