import { isArray, isString, snakeCase, startCase } from 'lodash';
import { getDefaultColumnProps } from './getDefaultColumnProps';

// Definitions
import { StandardCheckbox } from '../definitions/StandardCheckbox';
import { StandardCodeInput } from '../definitions/StandardCodeInput';
import { StandardInput } from '../definitions/StandardInput';
import { StandardPasswordInput } from '../definitions/StandardPasswordInput';
import { StandardSelect } from '../definitions/StandardSelect';
import { StandardSwitch } from '../definitions/StandardSwitch';
import { StandardTextarea } from '../definitions/StandardTextarea';
import { StandardUploadInput } from '../definitions/StandardUploadInput';

export const parseChildren = (children = []) => {
    const schema = {};

    const generatedComponents = {
        [StandardCheckbox.displayName]: 'boolean',
        [StandardCodeInput.displayName]: 'code',
        [StandardInput.displayName]: 'input',
        [StandardPasswordInput.displayName]: 'password',
        [StandardSelect.displayName]: 'select',
        [StandardSwitch.displayName]: 'boolean',
        [StandardTextarea.displayName]: 'textarea',
        [StandardUploadInput.displayName]: 'upload',
    };

    const usedChildren = isArray(children) ? children : [children];
    usedChildren.forEach((item, index) => {
        let fieldSchema = {};
        let name = '';

        // Get the type
        if (isString(item)) {
            return;
        }
        if (isString(item.type)) {
            if (item.type !== 'div') {
                throw new Error(
                    'Only divs are allowed in the GeneratedStandardForm schema'
                );
            }

            name = 'div' + index;
            fieldSchema.type = 'div';
        } else {
            fieldSchema.type = generatedComponents[item.type.displayName];

            if (item.type.displayName === StandardCheckbox.displayName) {
                fieldSchema.checkbox = true;
            }
        }

        const { props: allProps = {} } = item || {};
        const { children: itemChildren, ...props } = allProps;

        if (fieldSchema.type !== 'div') {
            name = props.name;
        }

        // Add the properties
        fieldSchema = {
            ...fieldSchema,
            ...props,
        };

        if (isString(itemChildren) || !itemChildren) {
            fieldSchema.label = itemChildren || props.label;
        } else {
            fieldSchema.children = parseChildren(itemChildren);
        }

        schema[name] = fieldSchema;
    });

    return schema;
};
