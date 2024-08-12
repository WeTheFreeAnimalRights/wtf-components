import PropTypes from 'prop-types';
import { useId } from 'react';
import './style.scss';

export const Select = ({
    label,
    name,
    value,
    options = [],
    placeholder,
    required = false,
    disabled = false,
    className,
}) => {
    const selectId = useId();

    return (
        <div className={className || ''}>
            {label && (
                <label
                    htmlFor={`select-${selectId}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}
            <select
                name={name}
                id={`select-${selectId}`}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={value || undefined}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {placeholder && (
                    <option value="" default>
                        {placeholder}
                    </option>
                )}

                {options.map((item) => (
                    <option key={`option-${item.value}`} value={item.value}>
                        {item.label || item.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    /**
     * The label to display next to the select box
     */
    label: PropTypes.string,

    /**
     * The name of the select box (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The selected value
     */
    value: PropTypes.string,

    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Value of the option
             */
            value: PropTypes.string.isRequired,

            /**
             * Label to be visible for the option
             */
            label: PropTypes.string,
        })
    ).isRequired,

    /**
     * The placeholder to be shown on the select
     */
    placeholder: PropTypes.string,

    /**
     * Is the select box required
     */
    required: PropTypes.bool,

    /**
     * Is the select box disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optional extra classname to the select box
     */
    className: PropTypes.string,
};
