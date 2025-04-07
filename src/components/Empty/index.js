import { isFunction } from 'lodash-es';
import { AnimalIcon } from '../AnimalIcon';
import { Button } from '../Button';
import { cn } from '_/lib/utils';

export const Empty = ({
    title,
    children,
    iconClassName,
    iconVariant,
    className,
    buttonLabel,
    onClick,
    hideIcon = false,
}) => {
    return (
        <div className="text-center px-8 py-12">
            {!hideIcon && (
                <AnimalIcon
                    className={cn('w-36 h-36 mx-auto', iconClassName)}
                    variant={iconVariant}
                />
            )}
            {title && <h1 className="mt-3 text-2xl font-semibold">{title}</h1>}
            <div className={cn('text-gray-500 mt-2', className)}>
                {children}
            </div>
            {buttonLabel && isFunction(onClick) && (
                <Button onClick={onClick} className="mt-3">
                    {buttonLabel}
                </Button>
            )}
        </div>
    );
};
