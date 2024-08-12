import PropTypes from 'prop-types';

export const Alert = ({
    title = '',
    icon = '',
    showTitle = false,
    theme = 'empty',
    className,
    children,
}) => {
    return (
        <div
            className={`${className || ''}
                p-4 border rounded-lg
                ${theme === 'info' ? 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800' : ''}
                ${theme === 'error' ? 'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800' : ''}
                ${theme === 'success' ? 'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800' : ''}
                ${theme === 'warning' ? 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800' : ''}
                ${theme === 'empty' ? 'text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800' : ''}
            `}
            role="alert"
        >
            {showTitle && (
                <div className="flex items-center mb-2">
                    {icon && <span className="mr-2">{icon}</span>}
                    <h3 className="text-lg font-medium">{title}</h3>
                </div>
            )}
            <div className="text-sm">{children}</div>
        </div>
    );
};

Alert.propTypes = {
    /**
     * The theme of the button - this controls the overall look of the button
     */
    theme: PropTypes.oneOf(['info', 'error', 'success', 'warning', 'empty']),

    /**
     * The title to be shown on the alert
     */
    title: PropTypes.string,

    /**
     * If there is a title, then it will be shown
     */
    showTitle: PropTypes.bool,

    /**
     * An icon to be shown on the left side of the alert
     */
    icon: PropTypes.elementType,

    /**
     * Optional extra classname to the alert
     */
    className: PropTypes.string,
};
