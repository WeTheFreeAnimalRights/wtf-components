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

export const FormFieldUploadInput = ({
    form: formParam,
    name,
    label,
    className,
    description,
    ...props
}) => {
    const standardForm = useContext(StandardFormContext);
    const form = formParam || standardForm.instance;

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: { value, ...fieldProps } }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <UploadInput
                            {...props}
                            {...fieldProps}
                            currentImage={value.preview}
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
