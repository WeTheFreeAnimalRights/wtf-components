import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { parseSortableChildren } from './helpers/parseSortableChildren';

export const SortableItem = ({ id, children, hasHandle = false }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: hasHandle ? undefined : 'none', // Disable scroll while dragging
    };

    if (hasHandle) {
        return (
            <div className="origin-top-left" ref={setNodeRef} style={style}>
                {parseSortableChildren(children, attributes, listeners)}
            </div>
        );
    }

    return (
        <div
            className="origin-top-left"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {children}
        </div>
    );
};
