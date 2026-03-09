import { useContext } from 'react';
import { FormFieldDatePicker } from '../../DatePicker/FormFieldDatePicker';
import { parseDate } from '../../DatePicker/parseDate';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a date picker for the generated form
 */
export const StandardDatePicker = ({ label, value, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldDatePicker
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            value={parseDate(value, otherProps.showTime || false)}
            {...otherProps}
        />
    );
};

StandardDatePicker.displayName = 'StandardDatePicker';
StandardDatePicker.standardForm = {
    type: 'datepicker',
};
