import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { StandardForm } from './index';
import { GeneratedStandardFields } from './GeneratedStandardFields';
import { GeneratedStandardFooter } from './GeneratedStandardFooter';
import { getStandardSchema } from '../../helpers/getStandardSchema';
import { useTranslations } from '../../hooks/useTranslations';
import { useStandardForm } from '../../hooks/useStandardForm';
import { parseChildren } from './helpers/parseChildren';
import { cn } from '_/lib/utils';
import { useToast } from '_/hooks/use-toast';

export const GeneratedStandardForm = ({
    schema,
    requestObject,
    onSuccess,
    onError,
    options,
    footer,
    values,
    children,
    className,

    cancelUrl,
    onCancel,
    footerLabels = {},
    toastMessage,
    onAllDone,
}) => {
    const { t } = useTranslations();

    // Try to get the schema from the children
    let usedSchema = schema;
    if (!usedSchema) {
        usedSchema = parseChildren(children);
        // if (children) {
        // } else {
        //     throw new Error(
        //         'A schema needs to be sent to the GeneratedStandardForm component'
        //     );
        // }
    }

    // Toast for when succesfully edited
    const { toast } = useToast();

    // To set also the label on the button (for desktop)
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmitted(false);

                // Call when the submitted returns to normal
                if (typeof onAllDone === 'function') {
                    onAllDone();
                }
            }, 1000);
        }
    }, [submitted]);

    // Standard form
    const { error, loading, form } = useStandardForm({
        schema: usedSchema,
        requestObject: requestObject || {},
        onSuccess: (...props) => {
            if (typeof toastMessage !== 'undefined') {
                toast({
                    title: toastMessage,
                });
            }

            setSubmitted(true);

            if (typeof onSuccess === 'function') {
                onSuccess(...props);
            }
        },
        onError,
        options,
    });

    // Get the fields
    const fields = getStandardSchema(usedSchema, options);

    // Reset the form when values change
    useEffect(() => {
        if (values) {
            form.reset(values);
        }
    }, [values]);

    return (
        <StandardForm
            form={form}
            className={cn('relative space-y-4', className)}
        >
            {loading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-white/75 z-10 flex flex-col items-center justify-center dark:bg-gray-800/75">
                    <Spinner />
                </div>
            )}

            <GeneratedStandardFields
                fields={fields}
                loading={loading}
                error={error}
            />

            {error && (
                <Alert
                    className="mb-3"
                    variant="destructive"
                    title={t('form-error')}
                >
                    {error}
                </Alert>
            )}

            <GeneratedStandardFooter
                cancelUrl={cancelUrl}
                onCancel={onCancel}
                footerLabels={footerLabels}
                footer={footer}
                error={error}
                loading={loading}
                submitted={submitted}
            />
        </StandardForm>
    );
};
