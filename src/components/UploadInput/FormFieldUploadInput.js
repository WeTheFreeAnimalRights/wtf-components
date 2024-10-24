import { isFunction } from 'lodash';
import { useContext } from 'react';
import { UploadInput } from './index';
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

export const FormFieldUploadInput = ({
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
            render={({ field: { value, ...fieldProps } }) => (
                <FormItem
                    className={cn(visible === false && 'hidden', className)}
                >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <UploadInput
                            {...props}
                            {...fieldProps}
                            onSelect={(selectedFile) => {
                                if (isFunction(onChange)) {
                                    onChange(selectedFile.file);
                                }
                                fieldProps.onChange(selectedFile.file);
                            }}
                            onRemove={() => {
                                onChange(null);
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
