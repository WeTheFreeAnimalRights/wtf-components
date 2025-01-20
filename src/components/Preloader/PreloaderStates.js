import { isFunction } from 'lodash-es';
import { Alert } from '../Alert';
import { Empty } from '../Empty';
import { Spinner } from '../Spinner';
import { PreloaderOutlet } from './PreloaderOutlet';
import { useDevelopmentMode } from '../../hooks/useDevelopmentMode';
import { traverseElements } from '../../helpers/traverseElements';

import { cn } from '_/lib/utils';

export const PreloaderStates = ({
    loading,
    loadingMessage,
    error,
    className,
    children,
    customPreloader,
    hasOutlet,
}) => {
    const { developmentMode } = useDevelopmentMode();

    if (hasOutlet) {
        return traverseElements(
            children,
            [PreloaderOutlet.displayName],
            (child, level, index) => {
                if (loading) {
                    return (
                        <Spinner
                            key={`outlet-${level}-${index}`}
                            className="w-6 h-6"
                        />
                    );
                }

                if (error) {
                    return <Alert variant="destructive">{error.message}</Alert>;
                }
            }
        );
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
