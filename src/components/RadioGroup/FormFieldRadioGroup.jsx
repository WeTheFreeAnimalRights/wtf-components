import { isFunction, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { RadioGroup, RadioGroupItem } from './index';
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

export const FormFieldRadioGroup = ({
    form: formParam,
    name,
    label,
    className,
    placeholder,
    options = [],
    description,
    onChange,
    visible,
    renderItem,
    itemClassName,
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
                        <RadioGroup
                            onValueChange={(newValue) => {
                                if (isFunction(onChange)) {
                                    onChange(newValue);
                                }
                                field.onChange(newValue);
                            }}
                            value={
                                !isUndefined(field.value)
                                    ? field.value
                                    : props.value
                            }
                            className="flex flex-col space-y-1"
                        >
                            {options?.length > 0 && (
                                <>
                                    {options.map((item) => (
                                        <FormItem
                                            key={`option-${item.value}`}
                                            className={cn(
                                                'flex items-center space-x-3 space-y-0',
                                                itemClassName
                                            )}
                                        >
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={item.value}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {isFunction(renderItem)
                                                    ? renderItem(item)
                                                    : item.label ||
                                                      item.name ||
                                                      item.value}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </>
                            )}
                        </RadioGroup>
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
