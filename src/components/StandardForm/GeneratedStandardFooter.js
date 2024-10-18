import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';

export const GeneratedStandardFooter = ({
    cancelUrl,
    onCancel,
    footerLabels,
    footer,
    error,
    loading,
    submitted,
}) => {
    const { t } = useTranslations();
    if (typeof footer === 'function') {
        return footer({ error, loading });
    }

    if (typeof cancelUrl === 'undefined' && typeof onCancel !== 'function') {
        return (
            <Button
                type="submit"
                variant={submitted ? 'simple' : 'default'}
                className="w-full"
                disabled={loading}
            >
                {submitted
                    ? footerLabels.done || t('Done')
                    : footerLabels.submit || t('Submit')}
            </Button>
        );
    }

    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center gap-4 mt-8">
            <Button
                type="submit"
                variant={submitted ? 'simple' : 'default'}
                className="w-full flex-grow basis-0"
                disabled={loading}
            >
                {submitted
                    ? footerLabels.done || t('Done')
                    : footerLabels.submit || t('Submit')}
            </Button>
            <Button
                type="button"
                className="w-full flex-grow basis-0"
                disabled={loading}
                variant="secondary"
                onClick={() => {
                    if (typeof onCancel === 'function') {
                        onCancel();
                    } else {
                        navigate(cancelUrl);
                    }
                }}
            >
                {footerLabels.cancel || t('Cancel')}
            </Button>
        </div>
    );
};
