import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';

export const TextInput = forwardRef(
    (
        {
            label,
            placeholder,
            name,
            value,
            type = 'text',
            maxLength,
            required = false,
            disabled = false,
            className,
        },
        ref
    ) => {
        const inputId = useId();

        return (
            <div className={className || ''}>
                {label && (
                    <label
                        htmlFor={`input-${inputId}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    name={name}
                    value={value || undefined}
                    id={`input-${inputId}`}
                    className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    maxLength={maxLength}
                    ref={ref}
                />
            </div>
        );
    }
);

TextInput.propTypes = {
    /**
     * The label to display next to the input
     */
    label: PropTypes.string,

    /**
     * The placeholder to display on the inut
     */
    placeholder: PropTypes.string,

    /**
     * The name of the text input (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The value of the text input
     */
    value: PropTypes.string,

    /**
     * The html type of the text input
     */
    type: PropTypes.string,

    /**
     * Max length of the input
     */
    maxLength: PropTypes.number,

    /**
     * Is the input required
     */
    required: PropTypes.bool,

    /**
     * Is the input disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,
};
