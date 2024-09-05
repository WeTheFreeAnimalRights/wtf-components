import React from 'react';
import PropTypes from 'prop-types';
import { useId, forwardRef, useState, useEffect } from 'react';
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
        ref
    ) => {
        const inputId = useId();
        const [code, setCode] = useState('');
        const [focused, setFocused] = useState(false);
        const [caretStart, setCaretStart] = useState(0);
        const [caretEnd, setCaretEnd] = useState(0);

        const maxCodeLengthArr = range(codeLength);

        const getValue = () => {
            if (typeof value !== 'undefined') {
                return value;
            }

            return code;
        };

        const selectionChange = (e) => {
            setCaretStart(e.currentTarget.selectionStart);
            setCaretEnd(e.currentTarget.selectionEnd);
        };

        useEffect(() => {
            if (typeof value !== 'undefined' && !value) {
                // If there is no value, reset the caret
                setCaretStart(0);
                setCaretEnd(0);
            }
        }, [value]);

        return (
            <div className={`${className || ''}`}>
                {label && (
                    <label
                        htmlFor={`input-${inputId}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {label}
                    </label>
                )}
                <div className="relative code-input inline-block">
                    <div className="flex flex-row">
                        {maxCodeLengthArr.map((item, index) => {
                            const current =
                                index <= caretEnd && index >= caretStart;
                            const filledIn = index < getValue().length;
                            return (
                                <div
                                    key={`square-${index}`}
                                    className={`rounded-lg
                                        w-10 sm:w-14 h-10 sm:h-14
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
                    </div>
                    <input
                        type="text"
                        id={`input-${inputId}`}
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
                        ref={ref}
                        disabled={disabled}
                        autoComplete="off"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onSelectCapture={selectionChange}
                        onSelect={selectionChange}
                        className={`absolute z-10 start-0 top-0 ps-3 sm:ps-4 pt-1 sm:pt-2 bg-transparent text-2xl sm:text-4xl tracking-[2.35rem] sm:tracking-[2.9rem] outline-none uppercase font-mono w-[calc(100%+2rem)] text-white`}
                    />
                </div>
            </div>
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
