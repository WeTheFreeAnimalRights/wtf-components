import React from 'react';
import PropTypes from 'prop-types';

export const BigTab = ({ visible, children }) => (
    <div
        className={`rounded-lg p-6
        bg-gray-700 dark:bg-gray-100
        text-white dark:text-gray-900
        ${visible ? '' : 'hidden'}
    `}
    >
        {children}
    </div>
);

BigTab.propTypes = {
    /**
     * Name of the tab
     */
    name: PropTypes.string,

    /**
     * An icon to be shown on the left side of the alert
     */
    icon: PropTypes.element,

    /**
     * If there is a title, then it will be shown
     */
    visible: PropTypes.bool,
};
