import * as React from 'react';

import { cn } from '_/lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
    <article
        ref={ref}
        className={cn(
            'rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden',
            className
        )}
        {...props}
    />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            'text-2xl font-semibold leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

const CardImage = React.forwardRef(({ className, ...props }, ref) => (
    <figure
        className={cn(
            'flex flex-column bg-gray-200 dark:bg-gray-900 text-white dark:text-black',
            className
        )}
        ref={ref}
    >
        <img
            className="object-cover w-full h-auto flex-grow aspect-video"
            {...props}
        />
    </figure>
));
CardImage.displayName = 'CardImage';

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardImage,
};
