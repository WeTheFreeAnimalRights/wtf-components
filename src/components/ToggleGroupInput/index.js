import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// ShadCN
import { ToggleGroup, ToggleGroupItem } from '_/components/toggle-group';
import { cn } from '_/lib/utils';

export const ToggleGroupInput = forwardRef(
    (
        {
            name,
            value = [],
            options = [],
            className,
            onChange,
            showLabel = false,
            ...props
        },
        ref
    ) => {
        return (
            <ToggleGroup
                variant="outline"
                type="multiple"
                value={value}
                ref={ref}
                onValueChange={onChange}
                className={cn('text-start justify-start flex-wrap', className)}
            >
                {options.map((item) => (
                    <ToggleGroupItem
                        value={item.value}
                        aria-label={item.label}
                        key={`item-${item.value}`}
                        className="rounded-full whitespace-nowrap"
                    >
                        {item.icon}
                        {showLabel && item.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        );
    }
);

export { FormFieldToggleGroupInput } from './FormFieldToggleGroupInput';

ToggleGroupInput.displayName = 'ToggleGroupInput';
ToggleGroupInput.propTypes = {
    /**
     * The name of the toggle group (useful for forms)
     */
    name: PropTypes.string,

    /**
     * Options of the toggle groups
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
     * Optional extra classname to the toggle group
     */
    className: PropTypes.string,
};
