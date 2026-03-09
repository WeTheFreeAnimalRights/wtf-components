import { useContext } from 'react';
import { FormFieldCombobox } from '../../Combobox/FormFieldCombobox';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a combobox for the generated form
 */
export const StandardCombobox = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldCombobox
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardCombobox.displayName = 'StandardCombobox';
StandardCombobox.standardForm = {
    type: 'combobox',
};
