import { isFunction } from 'lodash-es';
import { useContext } from 'react';
import { Combobox } from './index';
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

export const FormFieldCombobox = ({
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
                    <Combobox
                        onSelect={(newValue) => {
                            if (isFunction(onChange)) {
                                onChange(newValue);
                            }

                            field.onChange(newValue);
                        }}
                        value={field.value}
                        options={options}
                        placeholder={placeholder}
                        formControl
                        {...props}
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
