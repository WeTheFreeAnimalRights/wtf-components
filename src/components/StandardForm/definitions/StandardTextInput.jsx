import { useContext } from 'react';
import { FormFieldTextInput } from '../../TextInput/FormFieldTextInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE an input for the generated form
 */
export const StandardTextInput = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldTextInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardTextInput.displayName = 'StandardTextInput';
StandardTextInput.standardForm = {
    type: 'text',
};
