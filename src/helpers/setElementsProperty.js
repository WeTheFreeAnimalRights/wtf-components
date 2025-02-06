import { each } from 'lodash-es';

export const setElementsProperty = (elements, callback) => {
    each(elements, (item) => {
        if (item) {
            callback(item);
        }
    });
};
