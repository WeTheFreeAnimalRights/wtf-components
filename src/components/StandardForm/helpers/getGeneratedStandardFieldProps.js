import { omit } from 'lodash';
import { getStandardFieldDefaultSchema } from '../../../helpers/getStandardFieldDefaultSchema';

export const getGeneratedStandardFieldProps = (fieldSchema) => {
    // We remove all the props that are used for validation
    const keysToOmit = Object.keys(getStandardFieldDefaultSchema());

    // We also omit the props to show a checkbox
    keysToOmit.push('checkbox');

    // return the omitted object
    return omit(fieldSchema, keysToOmit);
};
