import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { TextInput } from '../TextInput';
import { useState } from 'react';

export const PasswordInput = forwardRef(({
    showLock = true,
    showShowHideButton = true,
    placeholder = '',
    ...props
},ref) => {
    const [visible, setVisible] = useState(false);

    const leftContent = !showLock ? undefined : (
        <div className="text-gray-500 dark:text-gray-300">
            <RiLockPasswordLine />
        </div>
    );
    const rightContent = !showShowHideButton ? undefined : (
        <button
            className="py-2 px-1 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={(e) => {
                e.preventDefault();
                setVisible(!visible);
            }}
            type="button"
        >
            {visible ? <RiEyeLine /> : <RiEyeOffLine />}
        </button>
    );

    return (
        <TextInput
        type={visible ? 'text' : 'password'}
        innerLeftContent={leftContent}
        innerRightContent={rightContent}
        placeholder={placeholder || '••••••••'}
        ref={ref}
        {...props}
        />
    );
});
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
