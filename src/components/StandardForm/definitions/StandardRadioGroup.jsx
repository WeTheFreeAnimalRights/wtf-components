import { useContext } from 'react';
import { FormFieldRadioGroup } from '../../RadioGroup/FormFieldRadioGroup';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a radio group for the generated form
 */
export const StandardRadioGroup = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldRadioGroup
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardRadioGroup.displayName = 'StandardRadioGroup';
StandardRadioGroup.standardForm = {
    type: 'select',
};
