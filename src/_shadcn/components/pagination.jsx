import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '_/lib/utils';
import { buttonVariants } from '_/components/button';

const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
    />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = ({
    children,
    className,
    isActive,
    size = 'icon',
    ...props
}) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'outline' : 'ghost',
                size,
            }),
            className
        )}
        {...props}
    >
        {children}
    </a>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ariaLabel, label, ...props }) => (
    <PaginationLink
        aria-label={ariaLabel}
        size="default"
        className={cn('gap-1 pl-2.5', className)}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>{label}</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ariaLabel, label, ...props }) => (
    <PaginationLink
        aria-label={ariaLabel}
        size="default"
        className={cn('gap-1 pr-2.5', className)}
        {...props}
    >
        <span>{label}</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, label, ...props }) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">{label}</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
