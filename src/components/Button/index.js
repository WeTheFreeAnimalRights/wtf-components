import React from 'react';
import PropTypes from 'prop-types';

// ShadCN
import { Button as ShadButton } from '_/components/button';

export const Button = React.forwardRef(
    (
        {
            variant = 'default',
            size = 'default',
            asChild = false,
            onClick,
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <ShadButton
                variant={variant}
                size={size}
                asChild={asChild}
                onClick={onClick}
                className={className}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

Button.propTypes = {
    /**
     * The variant of the button - this controls the overall look of the button
     */
    variant: PropTypes.oneOf([
        'default',
        'simple',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'wtf-pink',
    ]),

    /**
     * The size of the button
     */
    size: PropTypes.oneOf([
        'default',
        'sm',
        'lg',
        'icon',
        'auto',
        'wide',
        'small-icon',
    ]),

    /**
     * Use the first child as the tag
     */
    asChild: PropTypes.bool,

    /**
     * Optional click handler
     */
    onClick: PropTypes.func,

    /**
     * Optional extra classname to the button
     */
    className: PropTypes.string,
};
