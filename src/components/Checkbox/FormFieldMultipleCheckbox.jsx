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

export const FormFieldMultipleCheckbox = ({
    form: formParam,
    name,
    options = [],
    className,
    inputClassName,
    labelClassName,
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
            render={({ field }) => {
                const value = field.value || [];
                return (
                <div className={containerClassName}>
                    {options.map(item => (
                    <FormItem
                        className={cn(
                            'space-y-0 items-center flex flex-row',
                            visible === false && 'hidden',
                            className
                        )}
                        hidden={visible === false ? true : undefined}
                        key={`checkbox-${item.value}`}
                    >
                        <FormControl>
                            <Checkbox
                                checked={(value || []).includes(item.value)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked ?
                                            [...value, item.value]
                                            : value?.filter(
                                      (value) => value !== item.value
                                    );

                                    if (isFunction(onChange)) {
                                        onChange(newValue);
                                    }
                                    field.onChange(newValue);
                                }}
                                className={inputClassName}
                                {...props}
                            />
                        </FormControl>
                        <FormLabel className={cn('ms-2', labelClassName)}>{item.label}</FormLabel>
                    </FormItem>
                ))}
                {description && (
                    <FormDescription className="ms-2">
                        {description}
                    </FormDescription>
                )}
                    <FormMessage className={messageClassName} />
                </div>
            );}}
        />
    );
};
