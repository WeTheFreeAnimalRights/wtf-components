import { isFunction, isUndefined } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { StandardForm } from './index';
import { GeneratedStandardFooter } from './GeneratedStandardFooter';
import { useTranslations } from '../../hooks/useTranslations';
import { useStandardForm } from '../../hooks/useStandardForm';
import { getSchema } from './helpers/getSchema';

// Shad CN
import { cn } from '_/lib/utils';
import { useToast } from '_/hooks/use-toast';

export const GeneratedStandardForm = ({
    requestObject,
    onSuccess,
    onError,
    onLoading,
    options,
    footer,
    children,
    className,

    formRef,
    disabledSubmit = false,
    disabledMessage,
    cancelUrl,
    onCancel,
    beforeRequest,
    beforeRequestErrorMessage,
    footerLabels = {},
    footerSubmitButtonClassName,
    footerCancelButtonClassName,
    footerCancelButtonVariant,
    footerClassName,
    footerButtonsReverse = false,
    footerSubmitButtonVariant = 'default',
    toastMessage,
    onAllDone,
    showError = true,
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
                if (isFunction(onAllDone)) {
                    onAllDone();
                }
            }, 1000);
        }
    }, [submitted]);

    // Parse the children
    const { schema } = getSchema(children);

    // Standard form
    const { error, loading, form } = useStandardForm({
        schema,
        requestObject: requestObject || {},
        onSuccess: (...props) => {
            if (!isUndefined(toastMessage)) {
                toast({
                    title: toastMessage,
                });
            }

            setSubmitted(true);

            if (isFunction(onSuccess)) {
                onSuccess(...props, form);
            }
        },
        onError,
        onLoading,
        beforeRequest,
        beforeRequestErrorMessage,
        options,
    });

    return (
        <StandardForm
            form={form}
            loading={loading}
            className={cn('relative', className)}
            formRef={formRef}
        >
            {loading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-white/75 z-20 flex flex-col items-center justify-center dark:bg-background/75">
                    <Spinner />
                </div>
            )}

            {children}

            {error && showError && (
                <Alert
                    className="mt-6"
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
                    className={footerClassName}
                    buttonsReverse={footerButtonsReverse}
                    submitButtonClassName={footerSubmitButtonClassName}
                    submitButtonVariant={footerSubmitButtonVariant}
                    cancelButtonClassName={footerCancelButtonClassName}
                    cancelButtonVariant={footerCancelButtonVariant}
                />
            )}
        </StandardForm>
    );
};
