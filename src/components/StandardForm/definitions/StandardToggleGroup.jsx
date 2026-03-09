import { useContext } from 'react';
import { FormFieldToggleGroupInput } from '../../ToggleGroupInput/FormFieldToggleGroupInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a toggle group for the generated form
 */
export const StandardToggleGroup = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldToggleGroupInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardToggleGroup.displayName = 'StandardToggleGroup';
StandardToggleGroup.standardForm = {
    type: 'togglegroup',
};
