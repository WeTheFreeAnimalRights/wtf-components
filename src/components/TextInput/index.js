import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Pressable,
    TextInput as NativeTextInput,
} from 'react-native';

export const TextInput = forwardRef(
    (
        {
            label,
            placeholder,
            name,
            value,
            type = 'text',
            maxLength,
            required = false,
            disabled = false,
            errored = false,
            onChange,
            className,
            autoComplete,
            innerLeftContent,
            innerRightContent,
        },
        outerRef
    ) => {
        const innerRef = useRef(null);
        useImperativeHandle(outerRef, () => innerRef.current, []);

        return (
            <View className={className || ''}>
                {label && (
                    <Pressable
                        className="block mb-2"
                        onPress={() => {
                            innerRef.current.focus();
                        }}
                    >
                        <Text className="text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </Text>
                    </Pressable>
                )}
                <View className="relative">
                    {innerLeftContent && (
                        <View className="absolute start-0 top-0 bottom-0 flex flex-row justify-center items-center px-2.5">
                            {innerLeftContent}
                        </View>
                    )}

                    <NativeTextInput
                        type={type}
                        name={name}
                        value={value}
                        className={`
                            bg-gray-50 text-gray-800 text-sm text-start rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white

                            ${
                                errored
                                    ? 'border-2 border-red-300 dark:border-red-800'
                                    : 'border border-gray-300 dark:border-gray-500'
                            }
                            py-2.5
                            ${innerLeftContent ? 'ps-8' : 'ps-3'}
                            ${innerRightContent ? 'pe-10' : 'pe-3'}
                            `}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        maxLength={maxLength}
                        autoComplete={autoComplete}
                        onChange={onChange}
                        ref={innerRef}
                        secureTextEntry={type === 'password'}
                    />

                    {innerRightContent && (
                        <View className="absolute end-0 top-0 bottom-0 flex flex-row justify-center items-center px-2.5">
                            {innerRightContent}
                        </View>
                    )}
                </View>
            </View>
        );
    }
);

TextInput.propTypes = {
    /**
     * The label to display next to the input
     */
    label: PropTypes.string,

    /**
     * The placeholder to display on the inut
     */
    placeholder: PropTypes.string,

    /**
     * The name of the text input (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The value of the text input
     */
    value: PropTypes.string,

    /**
     * The html type of the text input
     */
    type: PropTypes.string,

    /**
     * Max length of the input
     */
    maxLength: PropTypes.number,

    /**
     * Is the input required
     */
    required: PropTypes.bool,

    /**
     * Is the input disabled
     */
    disabled: PropTypes.bool,

    /**
     * If the input is errrored, then a different style applies to it
     */
    errored: PropTypes.bool,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,

    /**
     * Optional handler when the input is being changed
     */
    onChange: PropTypes.func,

    /**
     * Optional content to be shown left side of the input
     */
    innerLeftContent: PropTypes.element,

    /**
     * Optional content to be shown right side of the input
     */
    innerRightContent: PropTypes.element,
};
