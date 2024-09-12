import { useRequest } from './useRequest';

export const useFormSubmit = ({
    requestObject,
    onSuccess,
    onError,
    options,
}) => {
    const { loading, error, request } = useRequest();

    // Whether to send the data to the server
    const { sendToServer } = options || {};

    // Submit method
    const formSubmit = async (values) => {
        if (sendToServer === false) {
            if (typeof onSuccess === 'function') {
                onSuccess(values);
            }
        } else {
            const data = await request(requestObject(values), onError);

            if (typeof onSuccess === 'function') {
                onSuccess(data);
            }
        }
    };

    return {
        error,
        loading,
        formSubmit,
    };
};
