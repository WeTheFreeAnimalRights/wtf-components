import React, { forwardRef } from 'react';
import * as icons from 'lucide-react';
import PropTypes from 'prop-types';
import { useTranslations } from '../../hooks/useTranslations';

// ShadCN
import { ToggleGroup, ToggleGroupItem } from '_/components/toggle-group';
import { cn } from '_/lib/utils';

export const ToggleGroupInput = forwardRef(
    (
        {
            name,
            value = [],
            options = [],
            variant = 'outline',
            className,
            itemClassName,
            onChange,
            showLabel = false,
            ...props
        },
        ref
    ) => {
        const { currentLanguage } = useTranslations();
        return (
            <ToggleGroup
                variant={variant}
                type="multiple"
                value={value}
                ref={ref}
                dir={currentLanguage.direction}
                onValueChange={onChange}
                className={cn('text-start justify-start flex-wrap', className)}
            >
                {options.map((item) => {
                    const selected = value.includes(item.value);
                    const Icon = icons[item.icon] || null;
                    return (
                        <ToggleGroupItem
                            value={item.value}
                            aria-label={item.label}
                            key={`item-${item.value}`}
                            className={cn(
                                'rounded-full whitespace-nowrap',
                                selected && 'border-2 border-wtf-pink',
                                itemClassName
                            )}
                        >
                            {Icon ? <Icon className="w-4 h-4" /> : null}
                            {showLabel && item.label}
                        </ToggleGroupItem>
                    );
                })}
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
