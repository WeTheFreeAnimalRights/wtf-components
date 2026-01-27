import { cn } from '_/lib/utils';
import { ActiveBadge } from '../ActiveBadge';

export const CardActiveTitle = ({ className, active, labels, children, showInactive }) => {
    return (
        <div className={cn('flex flex-row items-top', className)}>
            <div className="text-start flex-grow">{children}</div>
            <div className="text-end flex flex-col items-start">
                {(!showInactive && active || showInactive) &&
                <ActiveBadge active={active} labels={labels} />
                }
            </div>
        </div>
    );
};
