import { isFunction, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { PasswordInput } from './index';
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
import { cn } from '_/lib/utils';

export const FormFieldPasswordInput = ({
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
                    className={cn(visible === false && 'hidden', className)}
                    hidden={visible === false ? true : undefined}
                >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <PasswordInput
                            {...field}
                            {...props}
                            value={
                                !isUndefined(field.value)
                                    ? field.value
                                    : props.value
                            }
                            onChange={(event) => {
                                if (isFunction(onChange)) {
                                    onChange(event.target.value);
                                }
                                field.onChange(event);
                            }}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
