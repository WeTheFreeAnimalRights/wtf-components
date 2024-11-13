import { isFunction } from 'lodash';
import { useContext } from 'react';
import { Select } from './index';
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

export const FormFieldSelect = ({
    form: formParam,
    name,
    label,
    className,
    placeholder,
    options,
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
                    <Select
                        onValueChange={(newValue) => {
                            if (isFunction(onChange)) {
                                onChange(newValue);
                            }

                            field.onChange(newValue);
                        }}
                        {...props}
                        value={field.value || props.value}
                        options={options}
                        placeholder={placeholder}
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
