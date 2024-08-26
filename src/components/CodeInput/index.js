import React, {
    useImperativeHandle,
    useRef,
    forwardRef,
    useState,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, TextInput } from 'react-native';
import { range } from 'lodash';
import './style.scss';

export const CodeInput = forwardRef(
    (
        {
            label,
            name,
            value,
            required,
            className,
            codeLength = 5,
            onEnd,
            onChange,
            errored = false,
            disabled = false,
        },
        outerRef
    ) => {
        const [code, setCode] = useState('');
        const [focused, setFocused] = useState(false);
        const [caretStart, setCaretStart] = useState(0);
        const [caretEnd, setCaretEnd] = useState(0);

        const innerRef = useRef(null);
        useImperativeHandle(outerRef, () => innerRef.current, []);

        const maxCodeLengthArr = range(codeLength);
        const inputSize = 14;

        const getValue = () => {
            if (typeof value !== 'undefined') {
                return value;
            }

            return code;
        };

        const selectionChange = (e) => {
            const { start, end } = e.nativeEvent.selection;
            setCaretStart(start);
            setCaretEnd(end);
        };

        useEffect(() => {
            if (typeof value !== 'undefined' && !value) {
                // If there is no value, reset the caret
                setCaretStart(0);
                setCaretEnd(0);
            }
        }, [value]);

        return (
            <View className={`${className || ''}`}>
                {label && (
                    <Pressable
                        onPress={() => {
                            innerRef.current.focus();
                        }}
                    >
                        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </Text>
                    </Pressable>
                )}
                <View className="relative code-input inline-block">
                    <View className="flex flex-row">
                        {maxCodeLengthArr.map((item, index) => {
                            const current =
                                index <= caretEnd && index >= caretStart;
                            const filledIn = index < getValue().length;
                            return (
                                <View
                                    key={`square-${index}`}
                                    className={`rounded-lg
                                        w-${inputSize} h-${inputSize}
                                        ${
                                            errored
                                                ? 'border-2 border-red-300 dark:border-red-800'
                                                : 'border border-gray-300 dark:border-gray-500'
                                        }
                                        ${
                                            filledIn
                                                ? 'bg-blue-500'
                                                : 'bg-gray-50 dark:bg-gray-600'
                                        }
                                        ${index > 0 ? 'ms-3' : ''}
                                        ${current && focused ? 'ring-2 ring-blue-500' : ''}
                                    `}
                                />
                            );
                        })}
                    </View>
                    <TextInput
                        type="text"
                        name={name}
                        value={getValue()}
                        onChange={(e) => {
                            setCode(e.target.value);

                            if (
                                typeof onEnd === 'function' &&
                                e.target.value.length === codeLength
                            ) {
                                onEnd(e.target.value);
                            }

                            if (typeof onChange === 'function') {
                                onChange(e);
                            }
                        }}
                        required={required}
                        maxLength={codeLength}
                        ref={innerRef}
                        disabled={disabled}
                        autoComplete="off"
                        autoCorrect="off"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onSelectionChange={selectionChange}
                        selectTextOnFocus
                        className={`absolute z-10 start-0 top-0 ps-4 pt-2 bg-transparent text-4xl tracking-[2.9rem] outline-none uppercase font-mono w-[calc(100%+2rem)] text-white`}
                    />
                </View>
            </View>
        );
    }
);

CodeInput.propTypes = {
    /**
     * The name of the text input (useful for forms)
     */
    name: PropTypes.string,

    /**
     * The value of the text input
     */
    value: PropTypes.string,

    /**
     * Length of the code being used
     */
    codeLength: PropTypes.number,

    /**
     * If the input is errrored, then a different style applies to it
     */
    errored: PropTypes.bool,

    /**
     * Is the input required
     */
    required: PropTypes.bool,

    /**
     * Is the input disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,

    /**
     * Optional handler when the code is filled in
     */
    onEnd: PropTypes.func,

    /**
     * Optional handler when the code is being changed
     */
    onChange: PropTypes.func,
};
