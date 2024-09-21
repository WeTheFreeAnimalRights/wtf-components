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

export const FormFieldSelect = ({
    form: formParam,
    name,
    label,
    placeholder,
    options,
    description,
    ...props
}) => {
    const standardForm = useContext(StandardFormContext);
    const form = formParam || standardForm.instance;

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
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
