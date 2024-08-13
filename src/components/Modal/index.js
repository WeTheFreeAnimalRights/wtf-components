import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton } from './CloseButton';

export const Modal = ({
    title,
    showTitle = false,
    children,
    visible = false,
    onClose,
    closeMethods = ['key', 'overlay', 'button'],
    destroyOnHidden = false,
    noPadding = false,
    width = 'md',
    aspectRatio = 'auto',
    footer,
    showFooter = false,
    setOverflow = true,
}) => {
    // If the escape key is pressed, then consider it a close
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (
                e.key === 'Escape' &&
                typeof onClose === 'function' &&
                closeMethods.indexOf('key') >= 0
            ) {
                onClose(e);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeMethods]);

    // If the modal is visible disable the overflow of the body
    React.useEffect(() => {
        document.body.style.overflow =
            visible && setOverflow ? 'hidden' : 'unset';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [visible]);

    // Method called when the user clicks outside
    const onOutsideClick = (e) => {
        // If within the modal or overlay exit is disabled
        if (
            e.target.closest('[data-modal]') ||
            closeMethods.indexOf('overlay') < 0
        ) {
            return;
        }

        if (typeof onClose === 'function') {
            onClose(e);
        }
    };

    if (!visible && destroyOnHidden) {
        return null;
    }

    const hasCloseButton = closeMethods.indexOf('button') >= 0;

    return (
        <div
            className={`overflow-hidden fixed top-0 right-0 left-0 z-100 flex justify-center items-center w-screen md:inset-0 h-screen max-h-full bg-black/30 ${visible ? '' : 'hidden'}`}
            onClick={onOutsideClick}
        >
            <div className={`relative p-4 w-full max-w-${width} max-h-full`}>
                <div
                    className="relative bg-white rounded-lg shadow dark:bg-gray-800"
                    data-modal="1"
                >
                    {showTitle ? (
                        <div className="flex items-center justify-between p-3 md:p-4 border-b bg-gray-700 rounded-t-lg dark:border-gray-600 relative">
                            <h3 className="text-xl grow font-semibold text-white text-center">
                                {title}
                            </h3>
                            {hasCloseButton && (
                                <CloseButton onHeader onClick={onClose} />
                            )}
                        </div>
                    ) : (
                        <>
                            {hasCloseButton && (
                                <CloseButton onClick={onClose} />
                            )}
                        </>
                    )}
                    <div
                        className={`${noPadding ? '' : 'p-6'} max-h-[50rem] overflow-auto rounded-b aspect-${aspectRatio}`}
                    >
                        {children}
                    </div>
                    {showFooter && (
                        <div className="p-6 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 border-t">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    /**
     * Optional title for the modal
     */
    title: PropTypes.string,

    /**
     * Whether to show the title of the modal or not
     */
    showTitle: PropTypes.bool,

    /**
     * Whether the modal should be visible or not
     */
    visible: PropTypes.bool,

    /**
     * Callback when the modal is told to close
     */
    onClose: PropTypes.func,

    /**
     * Which methods are available to trigger the `onClose` callback
     * - key: when user presses Escape key
     * - overlay: when the user clicks on the overlay
     * - button: when the user clicks on the close button
     */
    closeMethods: PropTypes.arrayOf(
        PropTypes.oneOf(['key', 'overlay', 'button'])
    ),

    /**
     * Whether the modal contents should get destroyed when it's no longer
     * visible
     */
    destroyOnHidden: PropTypes.bool,

    /**
     * Whether the modal should have padding for the inner content or not
     */
    noPadding: PropTypes.bool,

    /**
     * Width of the modal (as defined by tailwind)
     */
    width: PropTypes.string,

    /**
     * Aspect ratio of the modal (as defined by tailwind)
     */
    aspectRatio: PropTypes.string,

    /**
     * Footer contents for the modal
     */
    footer: PropTypes.elementType,

    /**
     * Whether to show the footer or not
     */
    showFooter: PropTypes.bool,

    /**
     * Set the overflow of the body where the modal is
     */
    setOverflow: PropTypes.bool,
};
