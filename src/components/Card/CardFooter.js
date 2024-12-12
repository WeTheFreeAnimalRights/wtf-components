import { cn } from '_/lib/utils';

export const CardFooter = ({ items, className }) => {
    return (
        <div className={cn('flex flex-row items-center text-muted-foreground gap-6', className)}>
            {items.map((item, index) => {
                if (!item) {
                    return;
                }
                const Icon = item.icon;
                return (
                    <div
                        className="flex flex-row items-center gap-2"
                        key={`footer-item-${index}`}
                    >
                        <Icon className="w-5 h-5" />
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
};
CardFooter.displayName = 'CardFooter';
