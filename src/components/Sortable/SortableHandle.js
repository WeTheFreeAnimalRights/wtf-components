import { cloneElement, isValidElement } from 'react';

export const SortableHandle = ({
    attributes,
    listeners,
    children,
    asChild = false,
}) => {
    const style = {
        touchAction: 'none', // Disable scroll while dragging
    };

    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            className: 'cursor-grab',
            style,
            ...attributes,
            ...listeners,
        });
    }

    return (
        <div
            className="cursor-grab"
            style={style}
            {...attributes}
            {...listeners}
        >
            {children}
        </div>
    );
};
SortableHandle.displayName = 'SortableHandle';
