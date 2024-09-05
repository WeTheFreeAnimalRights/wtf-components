import React, { useState } from 'react';
import { Text, CheckBox, Pressable } from 'react-native';
import PropTypes from 'prop-types';

export const Checkbox = ({
    label,
    name,
    checked: propChecked,
    required = false,
    disabled = false,
    errored = false,
    className,
    labelTextColor = 'text-gray-900 dark:text-gray-300',
    onChange,
}) => {
    const [checked, setChecked] = useState(propChecked || false);

    return (
        <Pressable
            className={`${className || ''} flex flex-row items-center cursor-default`}
            onPress={(e) => {
                if (!disabled) {
                    setChecked(!checked);

                    if (typeof onChange === 'function') {
                        onChange(!checked, e);
                    }
                }
            }}
        >
            <CheckBox
                type="checkbox"
                name={name}
                className={`
                    w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                    ${
                        errored
                            ? 'border-2 border-red-300 dark:border-red-800'
                            : 'border border-gray-300 dark:border-gray-600'
                    }
                `}
                value={checked}
                required={required}
                disabled={disabled}
                onChange={(e) => {
                    setChecked(!checked);

                    if (typeof onChange === 'function') {
                        onChange(!checked, e);
                    }
                }}
            />
            {label && (
                <Text
                    className={`ms-2 text-sm font-medium select-none ${labelTextColor}`}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

Checkbox.propTypes = {
    /**
     * The label to display next to the checkbox
     */
    label: PropTypes.string,

    /**
     * The name of the checkbox input
     */
    name: PropTypes.string,

    /**
     * Is the checkbox already checked, or not
     */
    checked: PropTypes.bool,

    /**
     * Is the checkbox required
     */
    required: PropTypes.bool,

    /**
     * Is the checkbox disabled
     */
    disabled: PropTypes.bool,

    /**
     * Is the checkbox errored
     */
    errored: PropTypes.bool,

    /**
     * Optional extra classname to the checkbox
     */
    className: PropTypes.string,

    /**
     * Optional extra classes to use for the label text color
     */
    labelTextColor: PropTypes.string,

    /**
     * Optional onChange callback
     */
    onChange: PropTypes.func,
};
