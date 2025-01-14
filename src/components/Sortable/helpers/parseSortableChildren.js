import { traverseElements } from '../../../helpers/traverseElements';
import { SortableHandle } from '../SortableHandle';

export const parseSortableChildren = (children, attributes, listeners) => {
    return traverseElements(
        children,
        [SortableHandle.displayName],
        (child, index, level) => (
            <SortableHandle
                key={`sortable-handle-i${index}-l${level}`}
                attributes={attributes}
                listeners={listeners}
                {...child.props}
            />
        )
    );
};
