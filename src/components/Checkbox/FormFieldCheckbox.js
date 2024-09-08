import { Checkbox } from './index';

// ShadCN
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from '_/components/form';

export const FormFieldCheckbox = ({
    form,
    name,
    label,
    className,
    ...props
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...props}
                        />
                    </FormControl>
                    <FormLabel>{label}</FormLabel>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
