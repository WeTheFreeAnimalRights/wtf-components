import { isFunction, isUndefined } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { Alert } from '../Alert';

export const GeneratedStandardFooter = ({
    cancelUrl,
    onCancel,
    footerLabels,
    // error,
    disabledSubmit = false,
    disabledMessage,

    loading,
    submitted,
}) => {
    const { t } = useTranslations();

    const navigate = useNavigate();

    if (isUndefined(cancelUrl) && !isFunction(onCancel)) {
        return (
            <>
                {disabledSubmit && disabledMessage && (
                    <Alert>{disabledMessage}</Alert>
                )}
                <Button
                    type="submit"
                    variant={submitted ? 'simple' : 'default'}
                    className="w-full mt-8"
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
                    className="w-full flex-grow basis-0 sm:w-auto sm:grow-0"
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
                    className="w-full flex-grow basis-0 sm:w-auto sm:grow-0"
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
