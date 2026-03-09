import { useContext } from 'react';
import { FormFieldSelect } from '../../Select/FormFieldSelect';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a select for the generated form
 */
export const StandardSelect = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldSelect
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardSelect.displayName = 'StandardSelect';
StandardSelect.standardForm = {
    type: 'select',
};
