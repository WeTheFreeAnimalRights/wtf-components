import * as React from 'react';
import { cn } from '_/lib/utils';

const Textarea = React.forwardRef(
    ({ className, pre, ...props }, forwardedRef) => {
        const internalRef = React.useRef(null);

        React.useImperativeHandle(forwardedRef, () => internalRef.current);

        if (pre) {
            return (
                <div
                    className={cn(
                        'flex flex-col w-full items-stretch text-sm border border-input rounded-md bg-background ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                        className
                    )}
                >
                    <div
                        className="whitespace-pre-line text-muted-foreground mb-6 px-3 pt-3  overflow-x-hidden"
                        onClick={() => internalRef.current?.focus()}
                    >
                        {pre}
                    </div>
                    <textarea
                        ref={internalRef}
                        className="min-h-[80px] resize-none bg-transparent px-3 pb-3 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                        {...props}
                    />
                </div>
            );
        }

        // Default rendering (no pre)
        return (
            <textarea
                ref={internalRef}
                className={cn(
                    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
export { Textarea };
