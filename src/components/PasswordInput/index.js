import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { isUndefined } from 'lodash';

export const PasswordInput = forwardRef(
    (
        {
            showLock = true,
            showShowHideButton = true,
            placeholder = '',
            ...props
        },
        ref
    ) => {
        const [visible, setVisible] = useState(false);

        const leftContent = !showLock ? undefined : (
            <div className="text-gray-500 dark:text-gray-300">
                <LockKeyhole className="w-4 h-4" />
            </div>
        );
        const rightContent = !showShowHideButton ? undefined : (
            <Button
                variant="ghost"
                size="small-icon"
                onClick={(e) => {
                    e.preventDefault();
                    setVisible(!visible);
                }}
                type="button"
            >
                {visible ? (
                    <Eye className="w-4 h-4" />
                ) : (
                    <EyeOff className="w-4 h-4" />
                )}
            </Button>
        );

        return (
            <TextInput
                type={visible ? 'text' : 'password'}
                innerLeftContent={leftContent}
                innerRightContent={rightContent}
                placeholder={
                    !isUndefined(placeholder) ? placeholder : '••••••••'
                }
                ref={ref}
                {...props}
            />
        );
    }
);
export { FormFieldPasswordInput } from './FormFieldPasswordInput';

PasswordInput.propTypes = {
    /**
     * Show the left lock icon
     */
    showLock: PropTypes.bool,

    /**
     * Show the right show/hide password button
     *
     * @var {[type]}
     */
    showShowHideButton: PropTypes.bool,
};
