import React from 'react';
import { TriangleAlert } from 'lucide-react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useTranslations } from '../../hooks/useTranslations';

export const ErrorBoundary = ({ ...props }) => {
    const { t } = useTranslations();
    return (
        <ReactErrorBoundary
            fallback={
                <div
                    role="alert"
                    className="italic text-red-500 text-sm flex flex-row items-center gap-2"
                >
                    <TriangleAlert className="w-4 h-4" />
                    {t('something-went-wrong')}
                </div>
            }
            {...props}
        />
    );
};
