import { isFunction, isUndefined } from 'lodash';
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Minus, Plus } from 'lucide-react';
import { TextInput } from '../TextInput';
import { cn } from '_/lib/utils';
import { Button } from '../Button';

export const NumberInput = forwardRef(
    (
        {
            name,
            value,
            min = 0,
            max,
            className,
            inputClassName,
            onChange,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState(value || min);
        const isControlled = isUndefined(value);

        useEffect(() => {
            if (isControlled) {
                setInternalValue(value);
            }
        }, [isControlled, value]);

        const updateValue = (newValue) => {
            const clampedValue = Math.max(0, newValue);
            if (!isControlled) {
                setInternalValue(clampedValue);
            }

            if (isFunction(onChange)) {
                onChange(clampedValue);
            }
        };
        const increment = () =>
            updateValue((isControlled ? value : internalValue) + 1);
        const decrement = () =>
            updateValue((isControlled ? value : internalValue) - 1);

        return (
            <div className={cn('w-full max-w-[280px] space-y-2', className)}>
                <div className="flex">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrement}
                        className="rounded-r-none"
                        aria-label="+"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <TextInput
                        ref={ref}
                        type="number"
                        min={min}
                        max={max}
                        name={name}
                        value={internalValue}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (!isNaN(newValue) && newValue >= 0) {
                                updateValue(newValue);
                            }
                        }}
                        inputClassName={cn(
                            'w-14 border-x-0 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                            inputClassName
                        )}
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={increment}
                        className="rounded-l-none"
                        aria-label="-"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }
);

export { FormFieldNumberInput } from './FormFieldNumberInput';

NumberInput.propTypes = {
    /**
     * The name of the input
     */
    name: PropTypes.string,

    /**
     * The value of the input
     */
    value: PropTypes.number,

    /**
     * The minimum value of the input
     */
    min: PropTypes.number,

    /**
     * The maximum value of the input
     */
    max: PropTypes.number,

    /**
     * Optional extra classname to the container
     */
    className: PropTypes.string,

    /**
     * Optional extra classname to the input
     */
    inputClassName: PropTypes.string,

    /**
     * Called when the input changes
     */
    onChange: PropTypes.func,
};
