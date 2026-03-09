import { useContext } from 'react';
import { FormFieldMultipleCheckbox } from '../../Checkbox/FormFieldMultipleCheckbox';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a multiple checkbox for the generated form
 */
export const StandardMultipleCheckbox = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldMultipleCheckbox
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardMultipleCheckbox.displayName = 'StandardMultipleCheckbox';
StandardMultipleCheckbox.standardForm = {
    type: 'multiple',
};
