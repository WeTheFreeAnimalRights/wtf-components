import * as React from 'react';

import { cn } from '_/lib/utils';
import { Image } from '../../components/Image';

const Card = React.forwardRef(({ className, customizer, ...props }, ref) => (
    <article
        ref={ref}
        className={cn(
            'text-card-foreground overflow-hidden',
            customizer ? '' : 'rounded-lg border bg-card shadow-sm',
            className
        )}
        {...props}
    />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(
    ({ className, size = 'md', customizer, layout, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex flex-col space-y-1.5',
                size === 'md' ? 'p-6' : 'p-3',
                customizer ? 'p-0' : '',
                layout === 'horizontal' && customizer ? 'ps-3' : '',
                className
            )}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(
    ({ className, size = 'md', customizer, ...props }, ref) => (
        <h2
            ref={ref}
            className={cn(
                'text-2xl font-semibold leading-none tracking-tight',
                size === 'md' ? 'text-2xl' : 'text-lg',
                customizer ? 'text-sm mt-3 truncate font-bold' : '',
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(
    ({ className, size = 'md', customizer, ...props }, ref) => (
        <p
            ref={ref}
            className={cn(
                'text-muted-foreground',
                size === 'md' ? 'text-sm' : 'text-xs',
                customizer ? 'text-sm line-clamp-2 mt-2 w-3/4' : '',
                className
            )}
            {...props}
        />
    )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(
    ({ className, size = 'md', ...props }, ref) => (
        <div
            ref={ref}
            className={cn(size === 'md' ? 'p-6' : 'p-3', 'pt-0', className)}
            {...props}
        />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(
    ({ className, size = 'md', ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex items-center',
                size === 'md' ? 'p-6' : 'p-3',
                'pt-0',
                className
            )}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

const CardImage = React.forwardRef(
    ({ className, customizer, alt, fit, ...props }, ref) => (
        <figure
            className={cn(
                'flex flex-column bg-gray-200 dark:bg-gray-900 text-white dark:text-black',
                fit === 'cover' ? 'object-cover' : 'object-contain',
                customizer ? 'rounded-lg overflow-hidden' : '',
                className
            )}
            ref={ref}
        >
            <Image
                className={cn(
                    fit === 'cover' ? 'object-cover' : 'object-contain',
                    'w-full h-auto flex-grow aspect-video'
                )}
                alt={alt}
                {...props}
            />
        </figure>
    )
);
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
