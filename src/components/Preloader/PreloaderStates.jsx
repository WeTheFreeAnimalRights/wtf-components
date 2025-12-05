import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { isFunction, isPlainObject } from 'lodash-es';
import { Alert } from '../Alert';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';
import { Button } from '../Button';
import { useDevelopmentMode } from '../../hooks/useDevelopmentMode';
import { useTranslations } from '../../hooks/useTranslations';

// Shad CN
import { cn } from '_/lib/utils';
import { useToast } from '_/hooks/use-toast';

export const PreloaderStates = ({
    loading,
    loadingMessage,
    error,
    ignoreError,
    className,
    children,
    customPreloader,
    customError,
    errorVideo,
    renderChildren,
    cancelUrl,
    _id,
}) => {
    const { developmentMode } = useDevelopmentMode();
    const { t } = useTranslations();

    // Toast for optional errros
    const { toast } = useToast();

    // If the cancel url is provided
    const [, navigate] = useLocation();

    useEffect(() => {
        if (error && error?.config?.optional) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        }
    }, [error]);

    if (renderChildren) {
        return children;
    }

    if (loading) {
        if (isFunction(customPreloader)) {
            return customPreloader({
                loading,
                loadingMessage,
                error,
                className,
                children,
            });
        }

        return (
            <div
                className={cn(
                    'flex justify-center items-center w-screen h-screen bg-background p-24',
                    className
                )}
            >
                <div className="flex flex-col items-center justify-center text-center">
                    <Spinner />
                    {loadingMessage && (
                        <div className="mt-3 italic text-sm text-muted-foreground">
                            {loadingMessage}
                        </div>
                    )}
                    {cancelUrl && (
                        <Button
                            variant="secondary"
                            className="mt-3"
                            onClick={() => {
                                navigate(cancelUrl);
                            }}
                        >
                            {t('footer-cancel')}
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    if (error && !ignoreError && error?.config?.optional !== true) {
        if (developmentMode) {
            return (
                <div
                    className={cn(
                        'flex justify-center items-center w-screen h-screen bg-background p-24',
                        className
                    )}
                >
                    <Alert variant="destructive">{error.message}</Alert>
                </div>
            );
        }

        // If there is a custom error defined as a function
        if (isPlainObject(customError)) {
            // If there's an error status
            if (error.status && isFunction(customError[error.status])) {
                return customError[error.status]({
                    error,
                    ignoreError,
                });
            }

            // If there's no error status (a network error)
            if (!error.status && isFunction(customError.network)) {
                return customError.network({
                    error,
                    ignoreError,
                });
            }

            // If there's an error defined in all cases
            if (isFunction(customError.all)) {
                return customError.all({
                    error,
                    ignoreError,
                });
            }
        }

        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Empty title="Oops..." className="space-y-2">
                    <p>Something happened. If you can retry, do that!</p>
                    <p>
                        Otherwise, contact us at info@activism.wtf.
                        {_id && `(${_id})`}
                    </p>
                </Empty>
                {errorVideo}
            </div>
        );
    }

    return children;
};
