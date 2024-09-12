import { capitalize } from 'lodash';
import * as validations from './validations';

export const getFieldValidation = (standardField, { t, z }) => {
    const method = standardField.validate
        ? `validate${capitalize(standardField.type)}`
        : 'validateNot';
    if (!validations[method]) {
        throw new Error(
            `No validation for type \`${standardField.type}\` found`
        );
    }

    return validations[method](standardField, { t, z });
};
