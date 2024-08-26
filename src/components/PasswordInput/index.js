import React from 'react';
import PropTypes from 'prop-types';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { TextInput } from '../TextInput';
import { useState } from 'react';
import { View, Pressable } from 'react-native';

export const PasswordInput = ({
    showLock = true,
    showShowHideButton = true,
    placeholder = '',
    ...props
}) => {
    const [visible, setVisible] = useState(false);

    const leftContent = !showLock ? undefined : (
        <View className="text-gray-500 dark:text-gray-300">
            <RiLockPasswordLine />
        </View>
    );
    const rightContent = !showShowHideButton ? undefined : (
        <Pressable
            role="button"
            className="py-2 px-1 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            onPress={(e) => {
                e.preventDefault();
                setVisible(!visible);
            }}
            type="button"
        >
            {visible ? <RiEyeLine /> : <RiEyeOffLine />}
        </Pressable>
    );

    return (
        <TextInput
            {...props}
            type={visible ? 'text' : 'password'}
            innerLeftContent={leftContent}
            innerRightContent={rightContent}
            placeholder={placeholder || '••••••••'}
        />
    );
};

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
