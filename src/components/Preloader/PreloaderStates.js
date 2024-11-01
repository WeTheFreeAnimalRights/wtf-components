import { Alert } from '../Alert';
import { Spinner } from '../Spinner';

import { cn } from '_/lib/utils';

export const PreloaderStates = ({
    loading,
    loadingMessage,
    error,
    className,
    children,
}) => {
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

    return children;
};
