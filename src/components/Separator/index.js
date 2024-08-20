import React from 'react';
import PropTypes from 'prop-types';

export const Separator = ({ label = '', className = '' }) => {
    return (
        <div className={`${className} relative flex items-center`}>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            {label && (
                <span className="flex-shrink mx-2.5 text-gray-400 dark:text-gray-600">
                    {label}
                </span>
            )}
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>
    );
};

Separator.propTypes = {
    /**
     * Optional label to show on the separator
     */
    label: PropTypes.string,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,
};
