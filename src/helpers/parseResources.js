import { parseResourceItem } from './parseResourceItem';

export const parseResources = (resources) => {
    return resources.reduce(
        (obj, rawItem) => {
            // If there is no type, we don't care about them
            if (!rawItem.type) {
                return obj;
            }

            const item = parseResourceItem(rawItem);

            // Save by id
            const byId = {
                ...obj.byId,
                [item.id]: item,
            };

            // Save by type
            const byType = {
                ...obj.byType,
                [item.type]: [...(obj.byType[item.type] || []), item],
            };

            // Save highlighted
            const highlighted = !item.highlighted
                ? obj.highlighted
                : {
                      ...obj.highlighted,
                      [item.highlightedType]: [
                          ...(obj.highlighted[item.highlightedType] || []),
                          item,
                      ],
                  };

            // Save all of them
            const all = [...obj.all, item];

            return {
                byId,
                byType,
                highlighted,
                all,
            };
        },
        {
            byId: {},
            byType: {},
            highlighted: {},
            all: [],
        }
    );
};
