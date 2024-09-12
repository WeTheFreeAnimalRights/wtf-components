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
