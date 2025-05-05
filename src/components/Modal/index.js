import React from 'react';
import PropTypes from 'prop-types';

// ShadCN
import {
    Dialog as ShadDialog,
    DialogTrigger as ShadDialogTrigger,
    DialogContent as ShadDialogContent,
    DialogHeader as ShadDialogHeader,
    DialogTitle as ShadDialogTitle,
    DialogDescription as ShadDialogDescription,
    DialogFooter as ShadDialogFooter,d
} from '_/components/dialog';
import { cn } from '_/lib/utils';

// Trigger and container
export const ModalTrigger = React.forwardRef(({ ...props }, ref) => (
    <ShadDialogTrigger ref={ref} asChild={true} {...props} />
));
export const ModalContainer = ShadDialog;

export const Modal = ({
    title,
    description,
    children,
    className = '',
    headerClassName,
    contentClassName,
    footer,
    showCloseButton = true,
    showDescription = true,
    closeButtonClassName,
    closeIconClassName,
    setWidth = true,
    overflow = false,
    onClick,
}) => {
    return (
        <ShadDialogContent
            className={className}
            showCloseButton={showCloseButton}
            closeButtonClassName={closeButtonClassName}
            closeIconClassName={closeIconClassName}
            setWidth={setWidth}
            onClick={onClick}
        >
            {title && (
                <ShadDialogHeader className={headerClassName}>
                    <ShadDialogTitle>{title}</ShadDialogTitle>
                    {description && (
                        <ShadDialogDescription className={!showDescription && 'sr-only'}>
                            {description}
                        </ShadDialogDescription>
                    )}
                </ShadDialogHeader>
            )}
            <div
                className={cn(
                    overflow && 'overflow-y-auto flex-grow',
                    contentClassName
                )}
            >
                {children}
            </div>
            {footer && <ShadDialogFooter>{footer}</ShadDialogFooter>}
        </ShadDialogContent>
    );
};
Modal.displayName = 'Modal';

Modal.propTypes = {
    /**
     * Optional title for the modal
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * Optional description for the modal
     */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    /**
     * Optional extra classname to the modal
     */
    className: PropTypes.string,

    /**
     * Footer contents for the modal
     */
    footer: PropTypes.element,

    /**
     * Whether to show the close button or not
     */
    showCloseButton: PropTypes.bool,

    /**
     * Whether to set the width of the modal or not
     */
    setWidth: PropTypes.bool,

    /**
     * Whether the content should overflow or not
     */
    overflow: PropTypes.bool,
};
