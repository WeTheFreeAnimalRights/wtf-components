import { isArray } from "lodash";

export const replaceElement = (children, displayName, callback) => {
    const handleChild = (child) => {
        if (child?.type?.displayName === displayName) {
            return callback();
        }

        if (child?.props?.children) {
            const children = replaceElement(child.props.children, displayName, callback);
            return {
                ...child,
                props: {
                    ...child.props,
                    children,
                },
            };
        }

        return child;
    }

    if (!isArray(children)) {
        return handleChild(children);
    };

    return children.map(handleChild);
}
