import { isFunction } from 'lodash';
import { useContext } from 'react';
import { Select } from './index';
import { StandardFormContext } from '../StandardForm';

// ShadCN
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '_/components/form';

export const FormFieldSelect = ({
    form: formParam,
    name,
    label,
    placeholder,
    options,
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
                    className={visible === false && 'hidden'}
                    hidden={visible === false ? true : undefined}
                >
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={(newValue) => {
                            if (isFunction(onChange)) {
                                onChange(newValue);
                            }
                            field.onChange(newValue);
                        }}
                        value={field.value}
                        options={options}
                        placeholder={placeholder}
                        formControl
                        {...props}
                    />
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
