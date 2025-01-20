import { isFunction } from 'lodash-es';
import React, { forwardRef, useState } from 'react';
import moment from 'moment';
import { Calendar as CalendarIcon, X } from 'lucide-react';

import { cn } from '_/lib/utils';
import { Calendar } from '_/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { FormControl } from '_/components/form';
import { useTranslations } from '../../hooks/useTranslations';

export const DatePicker = forwardRef(
    (
        {
            value,
            placeholder,
            onChange,
            className,
            formControl = false,
            clearable = false,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);
        const { currentLanguage } = useTranslations();

        const trigger = (
            <Button
                variant="outline"
                className={cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                    clearable && 'pe-1',
                    className
                )}
                ref={ref}
                dir={currentLanguage.direction}
            >
                <div className="flex flex-row items-center gap-2 w-full">
                    <CalendarIcon className="h-4 w-4" />
                    <div className="flex-grow text-start">
                        {value ? (
                            moment(value).format('ll')
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>
                    {clearable && value && (
                        <Button
                            variant="ghost"
                            size="small-icon"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setOpen(false);

                                if (isFunction(onChange)) {
                                    onChange('');
                                }
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
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
