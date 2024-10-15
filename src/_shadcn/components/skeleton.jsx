import { cn } from '_/lib/utils';

function Skeleton({ className, animate = true, ...props }) {
    return (
        <div
            className={cn(
                'rounded-md bg-muted',
                animate ? 'animate-pulse' : '',
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
