import { TextInput } from './index';

// ShadCN
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from '_/components/form';

export const FormFieldTextInput = ({
    form,
    name,
    label,
    type = 'text',
    className,
    placeholder,
    ...props
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <TextInput
                            type={type}
                            placeholder={placeholder}
                            {...props}
                            {...field}
                            />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
