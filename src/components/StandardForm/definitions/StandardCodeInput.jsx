import { useContext } from 'react';
import { FormFieldCodeInput } from '../../CodeInput/FormFieldCodeInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a code input for the generated form
 */
export const StandardCodeInput = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldCodeInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardCodeInput.displayName = 'StandardCodeInput';
StandardCodeInput.standardForm = {
    type: 'code',
};
