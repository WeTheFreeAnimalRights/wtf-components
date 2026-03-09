import { useContext } from 'react';
import { FormFieldPasswordInput } from '../../PasswordInput/FormFieldPasswordInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a password input for the generated form
 */
export const StandardPasswordInput = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldPasswordInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardPasswordInput.displayName = 'StandardPasswordInput';
StandardPasswordInput.standardForm = {
    type: 'password',
};
