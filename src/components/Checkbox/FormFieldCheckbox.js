import { isFunction } from 'lodash';
import { useContext } from 'react';
import { Checkbox } from './index';
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

export const FormFieldCheckbox = ({
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
                    className={cn(
                        'space-y-0 items-center flex flex-row',
                        visible === false && 'hidden',
                        className
                    )}
                    hidden={visible === false ? true : undefined}
                >
                    <FormControl>
                        <Checkbox
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
                    <FormLabel className="ms-2">{label}</FormLabel>
                    {description && (
                        <FormDescription className="ms-2">
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
