import { omit } from 'lodash';
import { traverseElements } from '../../../helpers/traverseElements';
import { getGeneratedComponentMatrix } from './getGeneratedComponentMatrix';

export const parseChildren = (children, { loading, form }) => {
    const matrix = getGeneratedComponentMatrix();
    const searchableElements = Object.keys(matrix);

    return traverseElements(
        children,
        searchableElements,
        (child, index, level) => {
            const {
                props: { children, label, ...props },
            } = child;

            // If, for some reason, this component doesn't exist
            if (!matrix[child.type.displayName]) {
                return child;
            }

            // Get the type and the component
            const { Component } = matrix[child.type.displayName];

            // Generate the key of the component
            const key = `${child.type.displayName}-${index}-${level}`;

            // Get the generated props
            const keysToOmit = ['optional', 'includeInRequest'];
            const generatedProps = omit(props, keysToOmit);

            // Return (to replace) the component
            return (
                <Component
                    key={key}
                    form={form}
                    disabled={loading}
                    label={children || label}
                    {...generatedProps}
                />
            );
        }
    );
};
