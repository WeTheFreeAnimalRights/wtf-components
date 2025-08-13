import { isFunction } from 'lodash-es';
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
    inputClassName,
    containerClassName,
    messageClassName,
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
                <div className={cn('space-y-2', containerClassName)}>
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
                                className={inputClassName}
                                {...props}
                            />
                        </FormControl>
                        <FormLabel className="ms-2">{label}</FormLabel>
                        {description && (
                            <FormDescription className="ms-2">
                                {description}
                            </FormDescription>
                        )}
                    </FormItem>
                    <FormMessage className={messageClassName} />
                </div>
            )}
        />
    );
};
