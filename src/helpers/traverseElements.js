import { isArray, isUndefined } from 'lodash';

export const traverseElements = (
    children,
    displayNames = [],
    callback,
    level = 0
) => {
    const handleChild = (child, index = 0) => {
        if (displayNames.includes(child?.type?.displayName)) {
            return callback(child, level, index);
        }

        if (child?.props?.children) {
            const result = traverseElements(
                child.props.children,
                displayNames,
                callback,
                level + 1
            );

            // The user manipulated the children
            if (!isUndefined(result)) {
                return {
                    ...child,
                    props: {
                        ...child.props,
                        children: result,
                    },
                };
            }
        }

        return child;
    };

    if (!isArray(children)) {
        return handleChild(children);
    }

    return children.map(handleChild);
};
