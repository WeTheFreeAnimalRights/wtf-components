import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// ShadCN
import { Checkbox as ShadCheckbox } from '_/components/checkbox';

export const Checkbox = forwardRef(({ className, ...props }, ref) => {
    return <ShadCheckbox ref={ref} className={className} {...props} />;
});

export { FormFieldCheckbox } from './FormFieldCheckbox';

Checkbox.propTypes = {
    /**
     * Optional extra classname to the checkbox
     */
    className: PropTypes.string,
};
