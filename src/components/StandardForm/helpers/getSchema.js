import { traverseElements } from '../../../helpers/traverseElements';
import { StandardCheckbox } from '../definitions/StandardCheckbox';
import { getGeneratedComponentMatrix } from './getGeneratedComponentMatrix';

export const getSchema = (children) => {
    const matrix = getGeneratedComponentMatrix();
    const searchableElements = Object.keys(matrix);
    const values = {};
    const schema = {};

    traverseElements(children, searchableElements, (child) => {
        const {
            props: { value, children, ...props },
        } = child;

        // If, for some reason, this component doesn't exist
        if (!matrix[child.type.displayName]) {
            return child;
        }

        // Get the type and the component
        const { type } = matrix[child.type.displayName];

        // Get the name of the field
        const { name } = props;

        // Generate the field schema
        const fieldSchema = {
            type,
            name,
            label: children || props.label,
            value,
            ...props,
        };

        // If it's a checkbox
        if (child.type.displayName === StandardCheckbox.displayName) {
            fieldSchema.checkbox = true;
        }

        // Save the value and the schema
        values[name] = value;
        schema[name] = fieldSchema;
    });

    return {
        values,
        schema,
    };
};
