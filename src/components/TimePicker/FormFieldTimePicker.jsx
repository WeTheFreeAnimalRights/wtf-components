import { isFunction, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { TimePicker } from './index';
import { StandardFormContext } from '../StandardForm';

// ShadCN
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
    FormControl,
} from '_/components/form';
import { cn } from '_/lib/utils';
import { parseDate } from '../DatePicker/parseDate';

export const FormFieldTimePicker = ({
    form: formParam,
    name,
    label,
    className,
    placeholder,
    description,
    onChange,
    visible,
    ...props
}) => {
    const standardForm = useContext(StandardFormContext);
    const form = formParam || standardForm.instance;

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(visible === false && 'hidden', className)}
                    hidden={visible === false ? true : undefined}
                >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <TimePicker
                            placeholder={placeholder}
                            {...field}
                            {...props}
                            value={
                                !isUndefined(field.value)
                                    ? parseDate(field.value, true)
                                    : parseDate(props.value, true)
                            }
                            onChange={(newValue) => {
                                if (isFunction(onChange)) {
                                    onChange(newValue);
                                }
                                field.onChange(newValue);
                            }}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
