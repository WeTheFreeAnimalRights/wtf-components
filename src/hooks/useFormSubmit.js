import { isFunction } from 'lodash';
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
            if (isFunction(onSuccess)) {
                onSuccess(values);
            }
        } else {
            const _request = request.bind(
                this,
                requestObject(values),
                onError,
                onSuccess
            );
            await _request(_request);
        }
    };

    return {
        error,
        loading,
        formSubmit,
    };
};
