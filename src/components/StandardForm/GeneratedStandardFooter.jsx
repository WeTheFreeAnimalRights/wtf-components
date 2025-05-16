import { isFunction, isUndefined } from 'lodash-es';
import { useLocation } from 'wouter-preact';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { Alert } from '../Alert';

// Shad CN
import { cn } from '_/lib/utils';

export const GeneratedStandardFooter = ({
    cancelUrl,
    onCancel,
    footerLabels,
    // error,
    disabledSubmit = false,
    disabledMessage,

    submitButtonClassName,
    cancelButtonClassName,

    loading,
    submitted,
}) => {
    const { t } = useTranslations();

    const [location, navigate] = useLocation();

    if (isUndefined(cancelUrl) && !isFunction(onCancel)) {
        return (
            <>
                {disabledSubmit && disabledMessage && (
                    <Alert>{disabledMessage}</Alert>
                )}
                <Button
                    type="submit"
                    variant={submitted ? 'simple' : 'default'}
                    className={cn(
                        'w-full sm:w-auto mt-8',
                        submitButtonClassName
                    )}
                    disabled={disabledSubmit || loading}
                >
                    {submitted
                        ? footerLabels.done || t('footer-done')
                        : footerLabels.submit || t('footer-submit')}
                </Button>
            </>
        );
    }

    return (
        <>
            {disabledSubmit && disabledMessage && (
                <Alert>{disabledMessage}</Alert>
            )}
            <div className="flex flex-row items-center gap-4 mt-8">
                <Button
                    type="button"
                    className={cn(
                        'w-full flex-grow basis-0 sm:w-auto sm:grow-0',
                        cancelButtonClassName
                    )}
                    disabled={loading}
                    variant="secondary"
                    onClick={() => {
                        if (isFunction(onCancel)) {
                            onCancel();
                        } else {
                            navigate(cancelUrl);
                        }
                    }}
                >
                    {footerLabels.cancel || t('footer-cancel')}
                </Button>

                <Button
                    type="submit"
                    variant={submitted ? 'simple' : 'default'}
                    className={cn(
                        'w-full flex-grow basis-0 sm:w-auto sm:grow-0',
                        submitButtonClassName
                    )}
                    disabled={disabledSubmit || loading}
                >
                    {submitted
                        ? footerLabels.done || t('footer-done')
                        : footerLabels.submit || t('footer-submit')}
                </Button>
            </div>
        </>
    );
};
