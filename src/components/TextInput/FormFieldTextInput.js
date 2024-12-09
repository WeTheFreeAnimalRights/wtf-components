import { isFunction, isUndefined } from 'lodash';
import { useContext } from 'react';
import { TextInput } from './index';
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

export const FormFieldTextInput = ({
    form: formParam,
    name,
    label,
    type = 'text',
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
                        <TextInput
                            type={type}
                            placeholder={placeholder}
                            {...field}
                            {...props}
                            value={isUndefined(field.value) ? props.value : field.value}
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
