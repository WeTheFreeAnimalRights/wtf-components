import React from 'react';
import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';
import { range } from 'lodash';

// ShadCN
import {
    InputOTP as ShadInputOTP,
    InputOTPGroup as ShadInputOTPGroup,
    InputOTPSlot as ShadInputOTPSlot,
} from '_/components/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

export const CodeInput = forwardRef(
    (
        {
            label,
            value,
            className,
            codeLength = 5,
            onComplete,
            onChange,
            errored = false,
        },
        ref
    ) => {
        const inputId = useId();
        const maxCodeLengthArr = range(codeLength);

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

                <ShadInputOTP
                    maxLength={codeLength}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    id={`input-${inputId}`}
                    onComplete={onComplete}
                    inputMode="text"
                    pushPasswordManagerStrategy={false}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                >
                    <ShadInputOTPGroup>
                        {maxCodeLengthArr.map((item, index) => (
                            <ShadInputOTPSlot
                                index={index}
                                key={`slot-${index}`}
                                className={
                                    errored ? 'border-red-500 text-red-500' : ''
                                }
                            />
                        ))}
                    </ShadInputOTPGroup>
                </ShadInputOTP>
            </div>
        );
    }
);

CodeInput.propTypes = {
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
     * Optional extra classname to the input
     */
    className: PropTypes.string,

    /**
     * Optional handler when the code is filled in
     */
    onComplete: PropTypes.func,

    /**
     * Optional handler when the code is being changed
     */
    onChange: PropTypes.func,
};
