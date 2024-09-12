import { isFunction, isPlainObject } from 'lodash';
import { getStandardRequestBody } from './getStandardRequestBody';

export const getStandardRequestObject = (requestObject, standardSchema) => {
    // If user passed a function, then it's custom
    if (isFunction(requestObject)) {
        return requestObject;
    }

    if (!isPlainObject(requestObject)) {
        throw new Error(
            'Standard forms require either an object or a function to be passed on for requestObject'
        );
    }

    // If the request object has a body, then return it
    if (requestObject.body) {
        return () => requestObject;
    }

    return (values) => {
        return {
            ...requestObject,
            body: getStandardRequestBody(standardSchema, values),
        };
    };
};
