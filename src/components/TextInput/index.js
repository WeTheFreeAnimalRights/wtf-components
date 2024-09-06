import React from 'react';
import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';

// ShadCN
import { Input } from '_/components/input';

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
            errored = false,
            onChange,
            className,
            autoComplete,
            innerLeftContent,
            innerRightContent,
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
                <div className="relative">
                    {innerLeftContent && (
                        <div className="absolute start-0 top-0 bottom-0 flex flex-row justify-center items-center px-2.5">
                            {innerLeftContent}
                        </div>
                    )}

                    <Input
                        type={type}
                        name={name}
                        value={value || undefined}
                        id={`input-${inputId}`}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        maxLength={maxLength}
                        autoComplete={autoComplete}
                        onChange={onChange}
                        ref={ref}
                        className={`
                            ${errored ? 'border-red-500 dark:border-red-800' : ''}
                            ${innerLeftContent ? 'ps-8' : 'ps-3'}
                            ${innerRightContent ? 'pe-10' : 'pe-3'}
                        `}
                    />

                    {innerRightContent && (
                        <div className="absolute end-0 top-0 bottom-0 flex flex-row justify-center items-center px-2.5">
                            {innerRightContent}
                        </div>
                    )}
                </div>
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
     * If the input is errrored, then a different style applies to it
     */
    errored: PropTypes.bool,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,

    /**
     * Optional handler when the input is being changed
     */
    onChange: PropTypes.func,

    /**
     * Optional content to be shown left side of the input
     */
    innerLeftContent: PropTypes.element,

    /**
     * Optional content to be shown right side of the input
     */
    innerRightContent: PropTypes.element,
};
