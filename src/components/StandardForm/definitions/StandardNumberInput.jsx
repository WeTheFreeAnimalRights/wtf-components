import { useContext } from 'react';
import { FormFieldNumberInput } from '../../NumberInput/FormFieldNumberInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a number input for the generated form
 */
export const StandardNumberInput = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldNumberInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardNumberInput.displayName = 'StandardNumberInput';
StandardNumberInput.standardForm = {
    type: 'number',
};
