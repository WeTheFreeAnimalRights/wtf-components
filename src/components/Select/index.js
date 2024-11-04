import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
import { FormControl } from '_/components/form';

export const Select = forwardRef(
    (
        {
            name,
            value,
            options = [],
            placeholder,
            formControl = false,
            required = false,
            disabled = false,
            className,
            ...props
        },
        ref
    ) => {
        console.log('>>value', value);

        const trigger = (
            <ShadSelectTrigger className={className || ''}>
                {placeholder && <ShadSelectValue placeholder={placeholder} />}
            </ShadSelectTrigger>
        );

        return (
            <ShadSelect
                name={name}
                required={required}
                disabled={disabled}
                value={value}
                ref={ref}
                {...props}
            >
                {formControl ? <FormControl>{trigger}</FormControl> : trigger}
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
                                {item.label || item.name || item.value}
                            </ShadSelectItem>
                        ))}
                    </ShadSelectGroup>
                </ShadSelectContent>
            </ShadSelect>
        );
    }
);

export { FormFieldSelect } from './FormFieldSelect';

Select.displayName = 'Select';
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
     * Optional if select is used within a form
     */
    formControl: PropTypes.bool,

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
