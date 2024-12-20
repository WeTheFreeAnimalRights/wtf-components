import React from 'react';
import PropTypes from 'prop-types';

// ShadCN
import {
    Alert as ShadAlert,
    AlertTitle as ShadAlertTitle,
    AlertDescription as ShadAlertDescription,
} from '_/components/alert';
import { Info, TriangleAlert } from 'lucide-react';

export const Alert = ({
    title = '',
    variant = 'default',
    className,
    children,
}) => {
    return (
        <ShadAlert className={className} variant={variant}>
            {title && (
                <>
                    {variant === 'default' && <Info className="w-6 h-6" />}
                    {variant === 'destructive' && (
                        <TriangleAlert className="w-6 h-6" />
                    )}
                    <ShadAlertTitle>{title}</ShadAlertTitle>
                </>
            )}
            <ShadAlertDescription>{children}</ShadAlertDescription>
        </ShadAlert>
    );
};
Alert.displayName = 'Alert';

Alert.propTypes = {
    /**
     * The variant of the alert
     */
    variant: PropTypes.oneOf(['default', 'destructive']),

    /**
     * The title to be shown on the alert
     */
    title: PropTypes.string,

    /**
     * Optional extra classname to the alert
     */
    className: PropTypes.string,
};
