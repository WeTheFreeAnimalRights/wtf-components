import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// ShadCN
import { Badge as ShadBadge, badgeVariants } from '_/components/badge';

export const Badge = forwardRef(({ className, variant, ...props }, ref) => {
    return (
        <ShadBadge
            ref={ref}
            className={className}
            variant={variant}
            {...props}
        />
    );
});

export { badgeVariants };

Badge.displayName = 'Badge';
Badge.propTypes = {
    /**
     * The variant of the button - this controls the overall look of the button
     */
    variant: PropTypes.oneOf([
        'default',
        'simple',
        'secondary',
        'destructive',
        'constructive',
        'outline',
        'green',
        'teal',
        'amber',
        'cyan',
        'pink',
        'gray',
    ]),

    /**
     * Optional extra classname to the checkbox
     */
    className: PropTypes.string,
};
