import { isFunction } from 'lodash';
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
                        {...props}
                        {...field}
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
