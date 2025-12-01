import PropTypes from 'prop-types';
import { isFunction } from 'lodash-es';
import React, { forwardRef, useState } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';

import { cn } from '_/lib/utils';
import { Calendar } from '_/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { FormControl } from '_/components/form';
import { useTranslations } from '../../hooks/useTranslations';
import { getLocale } from '../../helpers/getLocale';
import { TimePicker } from '../TimePicker';
import { useFormatDate } from '../../hooks/useFormatDate';

export const DatePicker = forwardRef(
    (
        {
            value,
            placeholder,
            onChange,
            className,
            formControl = false,
            clearable = false,
            showTime = false,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);
        const { currentLanguage } = useTranslations();

        const locale = getLocale(currentLanguage.code);

        const formatDate = useFormatDate();

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
                            formatDate(
                                new Date(value),
                                showTime ? 'PP p' : 'PP'
                            )
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
                        selected={new Date(value)}
                        onSelect={(newValue) => {
                            if (!showTime) {
                                setOpen(false);
                            }
                            if (isFunction(onChange)) {
                                onChange(newValue);
                            }
                        }}
                        locale={locale}
                        initialFocus
                        {...props}
                    />
                    {showTime && (
                        <div className="p-3 border-t border-border">
                            <TimePicker
                                onChange={onChange}
                                value={value || undefined}
                            />
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        );
    }
);

export { FormFieldDatePicker } from './FormFieldDatePicker';

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
    /**
     * Value of the time picker (date object)
     */
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
    ]),

    /**
     * Called when the value is changed
     */
    onChange: PropTypes.func,

    /**
     * Placeholder of the input
     */
    placeholder: PropTypes.string,

    /**
     * Whether to show the time selector or not
     */
    showTime: PropTypes.bool,

    /**
     * Whether to have the clear on the input
     */
    clearable: PropTypes.bool,
};
