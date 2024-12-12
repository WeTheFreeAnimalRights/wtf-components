import React, { createContext } from 'react';
import { Form } from '_/components/form';
import { cn } from '_/lib/utils';

// Create a context to pass the form object
export const StandardFormContext = createContext(null);

export const StandardForm = ({ form, children, className }) => {
    return (
        <Form {...form.instance}>
            <StandardFormContext.Provider value={form}>
                <form
                    className={cn('relative', className)}
                    onSubmit={form.instance.handleSubmit(form.submit)}
                >
                    {children}
                </form>
            </StandardFormContext.Provider>
        </Form>
    );
};

export { GeneratedStandardForm } from './GeneratedStandardForm';
export { StandardCheckbox } from './definitions/StandardCheckbox';
export { StandardCodeInput } from './definitions/StandardCodeInput';
export { StandardCombobox } from './definitions/StandardCombobox';
export { StandardDatePicker } from './definitions/StandardDatePicker';
export { StandardTextInput } from './definitions/StandardTextInput';
export { StandardNumberInput } from './definitions/StandardNumberInput';
export { StandardPasswordInput } from './definitions/StandardPasswordInput';
export { StandardSelect } from './definitions/StandardSelect';
export { StandardSwitch } from './definitions/StandardSwitch';
export { StandardTextarea } from './definitions/StandardTextarea';
export { StandardToggleGroup } from './definitions/StandardToggleGroup';
