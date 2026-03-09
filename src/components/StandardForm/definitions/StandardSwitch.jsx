import { useContext } from 'react';
import { FormFieldSwitch } from '../../Switch/FormFieldSwitch';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a switch for the generated form
 */
export const StandardSwitch = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldSwitch
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardSwitch.displayName = 'StandardSwitch';
StandardSwitch.standardForm = {
    type: 'boolean',
};
