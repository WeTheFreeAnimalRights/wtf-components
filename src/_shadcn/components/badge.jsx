import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '_/lib/utils';
import { colors } from '_/lib/colors';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-white hover:bg-primary/80',
                simple: `border-transparent ${colors.pink}`,
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                constructive: `border-transparent ${colors.green}`,
                green: `border-transparent ${colors.green}`,
                teal: `border-transparent ${colors.teal}`,
                amber: `border-transparent ${colors.amber}`,
                cyan: `border-transparent ${colors.cyan}`,
                pink: `border-transparent ${colors.pink}`,
                gray: `border-transparent ${colors.gray}`,
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
});

export { Badge, badgeVariants };
