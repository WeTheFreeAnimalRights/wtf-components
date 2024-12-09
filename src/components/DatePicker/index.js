import { isFunction } from 'lodash';
import React, { forwardRef, useState } from 'react';
import moment from 'moment';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '_/lib/utils';
import { Calendar } from '_/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { FormControl } from '_/components/form';

export const DatePicker = forwardRef(
    (
        {
            value,
            placeholder,
            onChange,
            className,
            formControl = false,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);

        const trigger = (
            <Button
                variant="outline"
                className={cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                    className
                )}
                ref={ref}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                    moment(value).format('ll')
                ) : (
                    <span>{placeholder}</span>
                )}
            </Button>
        );

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {formControl ? (
                        <FormControl>{trigger}</FormControl>
                    ) : (
                        trigger
                    )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={value ? moment(value).toDate() : ''}
                        onSelect={(newValue) => {
                            setOpen(false);
                            if (isFunction(onChange)) {
                                onChange(moment(newValue).format('YYYY-MM-DD'));
                            }
                        }}
                        initialFocus
                        {...props}
                    />
                </PopoverContent>
            </Popover>
        );
    }
);

export { FormFieldDatePicker } from './FormFieldDatePicker';
