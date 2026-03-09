import { traverseElements } from '../../../helpers/traverseElements';

export const getSchema = (children) => {
    const values = {};
    const schema = {};

    traverseElements(
        children,
        (child) => child?.type?.standardForm,
        (child) => {
            const {
                props: { value, children, ...props },
            } = child;

            // Read the schema metadata directly from the component definition
            const standardForm = child.type.standardForm || {};

            // Get the name of the field
            const { name } = props;

            // Generate the field schema
            const fieldSchema = {
                ...standardForm,
                name,
                label: children || props.label,
                value,
                ...props,
            };

            // Save the value and the schema
            values[name] = value;
            schema[name] = fieldSchema;
        }
    );

    return {
        values,
        schema,
    };
};
