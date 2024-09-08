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
                <FormItem
                    className={[
                        'space-y-0 space-x-2 items-center flex flex-row',
                        className,
                    ]}
                >
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
