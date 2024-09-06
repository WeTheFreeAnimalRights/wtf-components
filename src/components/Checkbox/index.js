import React from 'react';
import PropTypes from 'prop-types';
import { useId } from 'react';

// ShadCN
import { Checkbox as ShadCheckbox } from '_/components/checkbox';

export const Checkbox = ({
    label,
    name,
    value = '1',
    checked,
    required = false,
    disabled = false,
    onChange,
    className,
    labelTextColor = 'text-gray-900 dark:text-gray-300',
}) => {
    const checkId = useId();

    return (
        <div className={`${className || ''} flex items-center`}>
            <ShadCheckbox
                id={`check-${checkId}`}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                required={required}
                disabled={disabled}
                onChange={onChange}
            />
            {label && (
                <label
                    htmlFor={`check-${checkId}`}
                    className={`ms-2 text-sm font-medium ${labelTextColor}`}
                >
                    {label}
                </label>
            )}
        </div>
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
     * The value of the checkbox input
     */
    value: PropTypes.string,

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
     * Optional extra classname to the checkbox
     */
    className: PropTypes.string,

    /**
     * Optional extra classes to use for the label text color
     */
    labelTextColor: PropTypes.string,

    /**
     * Optional handler when the button changes
     */
    onChange: PropTypes.func,
};
