import { useDevelopmentMode } from '../../hooks/useDevelopmentMode';
import { Alert } from '../Alert';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';

import { cn } from '_/lib/utils';

export const PreloaderStates = ({
    loading,
    loadingMessage,
    error,
    className,
    children,
}) => {
    const { developmentMode } = useDevelopmentMode();

    if (loading) {
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

    if (error) {
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
                    <p>Otherwise, contact us at info@activism.wtf.</p>
                </Empty>
            </div>
        );
    }

    return children;
};
