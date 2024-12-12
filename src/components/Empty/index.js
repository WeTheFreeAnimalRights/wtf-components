import { isFunction } from 'lodash';
import { AnimalIcon } from '../AnimalIcon';
import { Button } from '../Button';
import { cn } from '_/lib/utils';

export const Empty = ({
    title,
    children,
    iconClassName,
    buttonLabel,
    onClick,
}) => {
    return (
        <div className="text-center px-8 py-12">
            <AnimalIcon className={cn('w-36 h-36 mx-auto', iconClassName)} />
            {title && <h1 className="mt-3 text-2xl font-semibold">{title}</h1>}
            <div className="text-gray-500 mt-2">{children}</div>
            {buttonLabel && isFunction(onClick) && (
                <Button onClick={onClick} className="mt-3">
                    {buttonLabel}
                </Button>
            )}
        </div>
    );
};
