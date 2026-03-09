import { useContext } from 'react';
import { FormFieldTextarea } from '../../Textarea/FormFieldTextarea';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE a textarea for the generated form
 */
export const StandardTextarea = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldTextarea
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardTextarea.displayName = 'StandardTextarea';
StandardTextarea.standardForm = {
    type: 'textarea',
};
