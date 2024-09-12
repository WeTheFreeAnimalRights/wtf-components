import { useContext } from 'react';
import { Switch } from './index';
import { StandardFormContext } from '../StandardForm';

// ShadCN
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from '_/components/form';

export const FormFieldSwitch = ({
    form: formParam,
    name,
    label,
    className,
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
                    className={[
                        'space-y-0 space-x-2 items-center flex flex-row',
                        className,
                    ]}
                >
                    <FormControl>
                        <Switch
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
