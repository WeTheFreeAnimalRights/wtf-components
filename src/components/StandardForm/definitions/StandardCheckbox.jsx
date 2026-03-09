import { useContext } from 'react';
import { FormFieldCheckbox } from '../../Checkbox/FormFieldCheckbox';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a checkbox for the generated form
 */
export const StandardCheckbox = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldCheckbox
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardCheckbox.displayName = 'StandardCheckbox';
StandardCheckbox.standardForm = {
    type: 'boolean',
    checkbox: true,
};
