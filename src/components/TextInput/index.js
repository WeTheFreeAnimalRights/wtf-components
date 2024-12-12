import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// ShadCN
import { Input } from '_/components/input';
import { cn } from '_/lib/utils';

export const TextInput = forwardRef(
    (
        {
            type = 'text',
            className,
            inputClassName,
            innerLeftContent,
            innerRightContent,
            ...props
        },
        ref
    ) => {
        return (
            <div className={className || ''}>
                <div className="relative">
                    {innerLeftContent && (
                        <div className="absolute start-0 top-0 bottom-0 flex flex-row justify-center items-center px-2.5">
                            {innerLeftContent}
                        </div>
                    )}

                    <Input
                        type={type}
                        ref={ref}
                        className={cn(
                            innerLeftContent ? 'ps-8' : 'ps-3',
                            innerRightContent ? 'pe-10' : 'pe-3',
                            inputClassName
                        )}
                        {...props}
                    />

                    {innerRightContent && (
                        <div className="absolute end-0 top-0 bottom-0 flex flex-row justify-center items-center px-1">
                            {innerRightContent}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export { FormFieldTextInput } from './FormFieldTextInput';

TextInput.propTypes = {
    /**
     * The html type of the text input
     */
    type: PropTypes.string,

    /**
     * Optional extra classname to the container
     */
    className: PropTypes.string,

    /**
     * Optional extra classname to the input
     */
    inputClassName: PropTypes.string,

    /**
     * Optional content to be shown left side of the input
     */
    innerLeftContent: PropTypes.element,

    /**
     * Optional content to be shown right side of the input
     */
    innerRightContent: PropTypes.element,
};
