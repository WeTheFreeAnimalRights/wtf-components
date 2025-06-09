import { isFunction, isString, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { DatePicker } from './index';
import { StandardFormContext } from '../StandardForm';

// ShadCN
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '_/components/form';
import { cn } from '_/lib/utils';
import { parseDate } from './parseDate';

export const FormFieldDatePicker = ({
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
                    <DatePicker
                        placeholder={placeholder}
                        {...field}
                        {...props}
                        value={
                            !isUndefined(field.value)
                                ? parseDate(field.value)
                                : parseDate(props.value)
                        }
                        onChange={(newValue) => {
                            if (isFunction(onChange)) {
                                onChange(newValue);
                            }
                            field.onChange(newValue);
                        }}
                        formControl
                    />
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
