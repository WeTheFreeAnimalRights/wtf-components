import { Alert } from '../Alert';
import { Spinner } from '../Spinner';

import {cn} from '_/lib/utils';

export const PreloaderStates = ({ loading, error, className, children }) => {
    if (loading) {
        return (
            <div
                className={cn(
                    'flex justify-center items-center w-screen h-screen bg-background p-24',
                    className
                )}
            >
                <Spinner />
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
