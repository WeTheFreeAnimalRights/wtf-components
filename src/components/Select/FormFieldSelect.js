import { Select } from './index';

// ShadCN
import { FormField, FormItem, FormLabel, FormMessage } from '_/components/form';

export const FormFieldSelect = ({
    form,
    name,
    label,
    placeholder,
    options,
    ...props
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        options={options}
                        placeholder={placeholder}
                        formControl
                        {...props}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
