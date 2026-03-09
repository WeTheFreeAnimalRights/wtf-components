import { isArray, isFunction, isUndefined } from 'lodash-es';

export const traverseElements = (
    children,
    matcher = () => false,
    callback,
    level = 0
) => {
    const handleChild = (child, index = 0) => {
        if (isFunction(matcher) && matcher(child)) {
            return callback(child, level, index);
        }

        if (child?.props?.children) {
            const result = traverseElements(
                child.props.children,
                matcher,
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
