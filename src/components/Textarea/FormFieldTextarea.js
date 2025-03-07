import { isFunction, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { Textarea } from './index';
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

export const FormFieldTextarea = ({
    form: formParam,
    name,
    label,
    className,
    placeholder,
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
                        <Textarea
                            placeholder={placeholder}
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
