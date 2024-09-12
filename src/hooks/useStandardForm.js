import { getStandardSchema } from '../helpers/getStandardSchema';
import { getStandardRequestObject } from '../helpers/getStandardRequestObject';
import { getStandardDefaultValues } from '../helpers/getStandardDefaultValues';
import { useFormSubmit } from './useFormSubmit';
import { useStandardSchema } from './useStandardSchema';

export const useStandardForm = ({
    schema = {},
    requestObject,
    onSuccess,
    onError,
    options = {},
}) => {
    const standardSchema = getStandardSchema(schema, options);

    const { error, loading, formSubmit } = useFormSubmit({
        requestObject: getStandardRequestObject(requestObject, standardSchema),
        onSuccess,
        onError,
        options,
    });

    // Get the form properties
    const form = useStandardSchema(standardSchema);

    return {
        error,
        loading,
        form: {
            instance: form,
            submit: formSubmit,
            trigger: form.trigger,
            reset: (values) => {
                const defaultValues = getStandardDefaultValues(standardSchema);
                form.reset(values || defaultValues);
            },
        },
    };
};
