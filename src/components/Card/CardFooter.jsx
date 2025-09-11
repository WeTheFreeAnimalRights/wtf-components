import { Fragment, isValidElement } from 'react';
import { cn } from '_/lib/utils';

export const CardFooter = ({ items, className }) => {
    return (
        <div
            className={cn(
                'flex flex-row flex-wrap items-center text-muted-foreground gap-x-6 gap-y-2',
                className
            )}
        >
            {items.map((item, index) => {
                if (!item) {
                    return null;
                }

                if (isValidElement(item)) {
                    return (
                        <Fragment key={`footer-item-${index}`}>{item}</Fragment>
                    );
                }

                const Icon = item.icon;
                return (
                    <div
                        className="flex flex-row items-center gap-2"
                        key={`footer-item-${index}`}
                    >
                        <div className="flex-shrink-0">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-basis-0">{item.label}</div>
                    </div>
                );
            })}
        </div>
    );
};
CardFooter.displayName = 'CardFooter';
