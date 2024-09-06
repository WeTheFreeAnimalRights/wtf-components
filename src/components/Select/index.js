import React from 'react';
import PropTypes from 'prop-types';
import { useId } from 'react';

// ShadCN
import {
    Select as ShadSelect,
    SelectTrigger as ShadSelectTrigger,
    SelectContent as ShadSelectContent,
    SelectGroup as ShadSelectGroup,
    SelectValue as ShadSelectValue,
    SelectLabel as ShadSelectLabel,
    SelectItem as ShadSelectItem,
} from '_/components/select';

export const Select = ({
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
        <ShadSelect
            name={name}
            id={`select-${selectId}`}
            required={required}
            disabled={disabled}
            value={value}
        >
            <ShadSelectTrigger className={className || ''}>
                {placeholder && <ShadSelectValue placeholder={placeholder} />}
            </ShadSelectTrigger>
            <ShadSelectContent>
                <ShadSelectGroup>
                    {placeholder && (
                        <ShadSelectLabel>{placeholder}</ShadSelectLabel>
                    )}
                    {options.map((item) => (
                        <ShadSelectItem
                            key={`option-${item.value}`}
                            value={item.value}
                        >
                            {item.label || item.value}
                        </ShadSelectItem>
                    ))}
                </ShadSelectGroup>
            </ShadSelectContent>
        </ShadSelect>
    );
};

Select.propTypes = {
    /**
     * The name of the select box (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The selected value
     */
    value: PropTypes.string,

    /**
     * Options of the select
     */
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
