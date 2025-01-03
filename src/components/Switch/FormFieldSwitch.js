import { isFunction } from 'lodash';
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
    FormDescription,
} from '_/components/form';

export const FormFieldSwitch = ({
    form: formParam,
    name,
    label,
    className,
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
                    className={[
                        'space-y-0 space-x-2 items-center flex flex-row',
                        visible === false && 'hidden',
                        className,
                    ]}
                    hidden={visible === false ? true : undefined}
                >
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={(newValue) => {
                                if (isFunction(onChange)) {
                                    onChange(newValue);
                                }
                                field.onChange(newValue);
                            }}
                            {...props}
                        />
                    </FormControl>
                    <FormLabel>{label}</FormLabel>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
