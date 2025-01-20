import React from 'react';
import PropTypes from 'prop-types';

// ShadCN
import {
    Tooltip as ShadTooltip,
    TooltipProvider as ShadTooltipProvider,
    TooltipTrigger as ShadTooltipTrigger,
    TooltipContent as ShadTooltipContent,
} from '_/components/tooltip';

export const Tooltip = ({
    message,
    children,
    offset,
    delay = 200,
    className,
}) => {
    return (
        <ShadTooltipProvider delayDuration={delay}>
            <ShadTooltip>
                <ShadTooltipTrigger asChild>{children}</ShadTooltipTrigger>
                <ShadTooltipContent sideOffset={offset} className={className}>
                    {message}
                </ShadTooltipContent>
            </ShadTooltip>
        </ShadTooltipProvider>
    );
};

Tooltip.propTypes = {
    /**
     * What message to show in the tooltip
     */
    message: PropTypes.string,

    /**
     * Milliseconds delay when to show the tooltip
     */
    delay: PropTypes.number,

    /**
     * Optional offset to set for the tooltip (Default: 4)
     */
    offset: PropTypes.number,
};
