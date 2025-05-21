import { useEffect } from 'react';
import { isFunction } from 'lodash-es';
import { Alert } from '../Alert';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';
import { useDevelopmentMode } from '../../hooks/useDevelopmentMode';

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
    renderChildren,
    _id,
}) => {
    const { developmentMode } = useDevelopmentMode();

    // Toast for optional errros
    const { toast } = useToast();

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
                        <div className="mt-3 italic text-sm">
                            {loadingMessage}
                        </div>
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

        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Empty title="Oops..." className="space-y-2">
                    <p>Something happened. If you can retry, do that!</p>
                    <p>
                        Otherwise, contact us at info@activism.wtf.
                        {_id && `(${_id})`}
                    </p>
                </Empty>
            </div>
        );
    }

    return children;
};
