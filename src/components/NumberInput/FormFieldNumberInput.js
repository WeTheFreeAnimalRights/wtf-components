import { isFunction } from 'lodash';
import { useContext } from 'react';
import { NumberInput } from './index';
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

export const FormFieldNumberInput = ({
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
                        <NumberInput
                            placeholder={placeholder}
                            {...field}
                            {...props}
                            value={field.value || props.value}
                            onChange={(newValue) => {
                                if (isFunction(onChange)) {
                                    onChange(newValue);
                                }
                                field.onChange(newValue);
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
