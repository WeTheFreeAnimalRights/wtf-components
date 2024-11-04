import { isFunction } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { StandardForm } from './index';
import { GeneratedStandardFooter } from './GeneratedStandardFooter';
import { useTranslations } from '../../hooks/useTranslations';
import { useStandardForm } from '../../hooks/useStandardForm';
import { getSchema } from './helpers/getSchema';
import { parseChildren } from './helpers/parseChildren';
import { cn } from '_/lib/utils';
import { useToast } from '_/hooks/use-toast';

export const GeneratedStandardForm = ({
    requestObject,
    onSuccess,
    onError,
    options,
    footer,
    children: componentChildren,
    className,

    disabledSubmit = false,
    disabledMessage,
    cancelUrl,
    onCancel,
    footerLabels = {},
    toastMessage,
    onAllDone,
}) => {
    const { t } = useTranslations();

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

    // Parse the children
    const { schema } = getSchema(componentChildren);

    // Standard form
    const { error, loading, form } = useStandardForm({
        schema,
        requestObject: requestObject || {},
        onSuccess: (...props) => {
            if (typeof toastMessage !== 'undefined') {
                toast({
                    title: toastMessage,
                });
            }

            setSubmitted(true);

            if (typeof onSuccess === 'function') {
                onSuccess(...props, form);
            }
        },
        onError,
        options,
    });

    const children = parseChildren(componentChildren, { error, loading, form });

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

            {children}

            {error && (
                <Alert
                    className="mb-3"
                    variant="destructive"
                    title={t('form-error')}
                >
                    {error}
                </Alert>
            )}

            {isFunction(footer) ? (
                footer({ loading })
            ) : (
                <GeneratedStandardFooter
                    disabledSubmit={disabledSubmit}
                    disabledMessage={disabledMessage}
                    cancelUrl={cancelUrl}
                    onCancel={onCancel}
                    footerLabels={footerLabels}
                    error={error}
                    loading={loading}
                    submitted={submitted}
                />
            )}
        </StandardForm>
    );
};
