import { useContext } from 'react';
import { FormFieldTimePicker } from '../../TimePicker/FormFieldTimePicker';
import { parseDate } from '../../DatePicker/parseDate';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a time picker for the generated form
 */
export const StandardTimePicker = ({ label, value, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldTimePicker
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            value={parseDate(value, true)}
            {...otherProps}
        />
    );
};

StandardTimePicker.displayName = 'StandardTimePicker';
StandardTimePicker.standardForm = {
    type: 'timepicker',
};
