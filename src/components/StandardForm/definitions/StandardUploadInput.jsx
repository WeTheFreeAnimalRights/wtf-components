import { useContext } from 'react';
import { FormFieldUploadInput } from '../../UploadInput/FormFieldUploadInput';
import { StandardFormContext } from '..';
import { getParsedStandardProps } from '../helpers/getParsedStandardProps';

/**
 * Component used to DEFINE an upload input for the generated form
 */
export const StandardUploadInput = ({ label, children, ...props }) => {
    const standardForm = useContext(StandardFormContext);
    const otherProps = getParsedStandardProps(props);
    return (
        <FormFieldUploadInput
            form={standardForm.form}
            disabled={standardForm.loading}
            label={children || label}
            {...otherProps}
        />
    );
};

StandardUploadInput.displayName = 'StandardUploadInput';
StandardUploadInput.standardForm = {
    type: 'upload',
};
