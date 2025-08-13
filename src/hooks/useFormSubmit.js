import { isFunction } from 'lodash-es';
import { useRequest } from './useRequest';
import { parseValues } from '../helpers/parseValues';

export const useFormSubmit = ({
    requestObject,
    onSuccess,
    onError,
    onLoading,
    beforeRequest,
    beforeRequestErrorMessage,
    options,
}) => {
    const { loading, error, request } = useRequest();

    // Whether to send the data to the server
    const { sendToServer } = options || {};

    // Submit method
    const formSubmit = async (values) => {
        if (sendToServer === false) {
            if (isFunction(onSuccess)) {
                onSuccess(parseValues(values));
            }
        } else {
            const _request = request.bind(
                this,
                await requestObject(values),
                onError,
                onSuccess,
                onLoading,
                beforeRequest,
                beforeRequestErrorMessage
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
