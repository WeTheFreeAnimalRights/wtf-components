import { isFunction } from 'lodash-es';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import {
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock5,
    Clock6,
    Clock7,
    Clock8,
    Clock9,
    Clock10,
    Clock11,
    Clock12,
} from 'lucide-react';
import { Label } from '_/components/label';
import { TimePeriodSelect } from '_/components/time-period-select';
import { TimePickerInput } from '_/components/time-picker-input';
import { useTranslations } from '../../hooks/useTranslations';
import { useFormatDate } from '../../hooks/useFormatDate';
import { isNoon } from '../../helpers/isNoon';

const clocks = {
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock5,
    Clock6,
    Clock7,
    Clock8,
    Clock9,
    Clock10,
    Clock11,
    Clock12,
};

export const TimePicker = forwardRef(
    (
        {
            value,
            onChange,
            picker = '12hours',
            showSeconds = false,
            showLabels = true,
            showIcon = true,
        },
        ref
    ) => {
        const minuteRef = useRef(null);
        const hourRef = useRef(null);
        const secondRef = useRef(null);
        const periodRef = useRef(null);

        const formatDate = useFormatDate();

        const { t } = useTranslations();
        const [date, setDate] = useState(value);
        const [period, setPeriod] = useState(
            value ? formatDate(value, 'a') : 'AM'
        );

        useEffect(() => {
            setDate(value);
            setPeriod(formatDate(value, 'a'));
        }, [value]);

        const onDateChange = (newDate) => {
            newDate.withTime = true;

            setDate(newDate);
            if (isFunction(onChange)) {
                onChange(newDate);
            }
        };

        // Get the icon
        const Icon = clocks[`Clock${formatDate(date, 'h')}`];

        return (
            <div className="flex items-end gap-2" ref={ref}>
                <div className="grid gap-1 text-center">
                    {showLabels && (
                        <Label htmlFor="hours" className="text-xs">
                            {t('tp-hours')}
                        </Label>
                    )}
                    <TimePickerInput
                        picker={picker === '12hours' ? '12hours' : 'hours'}
                        period={period}
                        date={date}
                        setDate={onDateChange}
                        ref={hourRef}
                        onRightFocus={() => minuteRef.current?.focus()}
                    />
                </div>
                <div className="grid gap-1 text-center">
                    {showLabels && (
                        <Label htmlFor="minutes" className="text-xs">
                            {t('tp-minutes')}
                        </Label>
                    )}
                    <TimePickerInput
                        picker="minutes"
                        date={date}
                        setDate={onDateChange}
                        ref={minuteRef}
                        onLeftFocus={() => hourRef.current?.focus()}
                        onRightFocus={() => {
                            if (showSeconds) {
                                secondRef.current?.focus();
                            } else {
                                if (picker === '12hours') {
                                    periodRef.current?.focus();
                                }
                            }
                        }}
                    />
                </div>
                {showSeconds && (
                    <div className="grid gap-1 text-center">
                        {showLabels && (
                            <Label htmlFor="seconds" className="text-xs">
                                {t('tp-seconds')}
                            </Label>
                        )}
                        <TimePickerInput
                            picker="seconds"
                            date={date}
                            setDate={onDateChange}
                            ref={secondRef}
                            onLeftFocus={() => minuteRef.current?.focus()}
                            onRightFocus={() => {
                                if (picker === '12hours') {
                                    periodRef.current?.focus();
                                }
                            }}
                        />
                    </div>
                )}

                {picker === '12hours' && (
                    <div className="grid gap-1 text-center">
                        {showLabels && (
                            <Label htmlFor="period" className="text-xs">
                                {t('tp-period')}
                            </Label>
                        )}
                        <TimePeriodSelect
                            period={period}
                            setPeriod={setPeriod}
                            date={date}
                            setDate={onDateChange}
                            ref={periodRef}
                            onLeftFocus={() => {
                                if (showSeconds) {
                                    secondRef.current?.focus();
                                } else {
                                    minuteRef.current?.focus();
                                }
                            }}
                        />
                    </div>
                )}
                {showIcon && (
                    <div className="flex h-10 items-center text-muted-foreground">
                        <Icon className="ms-2 h-4 w-4" />
                        <div className="ms-2 text-xs">
                            {formatDate(
                                date,
                                isNoon(date) ? 'hh:mm' : 'hh:mm a'
                            )}
                            {isNoon(date) && ` ${t('time-noon')}`}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

export { FormFieldTimePicker } from './FormFieldTimePicker';

TimePicker.displayName = 'TimePicker';

TimePicker.propTypes = {
    /**
     * Whether to show the seconds or not
     */
    showSeconds: PropTypes.bool,

    /**
     * Value of the time picker (date object)
     */
    value: PropTypes.object,

    /**
     * Called when the value is changed
     */
    onChange: PropTypes.func,
};
